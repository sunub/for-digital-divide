import AxeBuilder from "@axe-core/playwright";
import { expect, type Locator, type Page } from "@playwright/test";

export const WCAG_TAGS: readonly string[] = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
];

export interface ScreenSpec {
  /** 리포트에 기록할 화면 식별자 (URL step 값 또는 경로 기반) */
  id: string;
  /** 사람이 읽는 화면 이름 */
  label: string;
  /** 사용자가 지나는 흐름 묶음 */
  flow: "onboarding" | "login" | "pin-register" | "dashboard" | "transfer";
  /** 현재 URL 이 이 화면임을 확인하는 패턴 */
  url: RegExp;
  /** 프레임 바깥 안내 영역의 제목이 이 단계용 문구인지 확인하는 패턴 */
  guideHeading: RegExp;
  /** 프레임(main) 안에서 이 단계의 조작 요소를 찾는 함수 */
  frameControl: (main: Locator) => Locator;
  /** 직전 화면과 같은 안내를 의도적으로 공유하는 경우 true */
  sharesGuideWithPrevious?: boolean;
}

export interface AxeViolationSummary {
  id: string;
  impact: string | null;
  help: string;
  nodes: number;
  targets: string[];
}

export interface ScreenEvidence {
  id: string;
  label: string;
  flow: ScreenSpec["flow"];
  url: string;
  guideHeading: string;
  guideSectionHeadings: string[];
  hasWhySection: boolean;
  guideOutsideFrame: boolean;
  frameControlInsideFrame: boolean;
  guideInLandmark: boolean;
  guideChangedFromPrevious: boolean | null;
  axe: {
    violationCount: number;
    violatedNodeCount: number;
    violations: AxeViolationSummary[];
  };
}

/** 프레임(main) 바깥에 있는 안내 영역의 h1 */
export function guideHeadingLocator(page: Page): Locator {
  return page.locator("h1:not(main h1)").first();
}

function normalize(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

async function readGuideSectionHeadings(page: Page): Promise<string[]> {
  const texts: string[] = await page
    .locator("h3:not(main h3), h4:not(main h4)")
    .allInnerTexts();
  return texts
    .map(normalize)
    .filter((text: string) => text.length > 0 && text !== "진행 안내");
}

async function scanAccessibility(page: Page): Promise<ScreenEvidence["axe"]> {
  // 등장·퇴장 애니메이션 중간 프레임(반투명)은 사용자가 읽는 정지 상태가 아니므로, 애니메이션이 끝난 뒤 검사한다.
  await page
    .waitForFunction(
      () =>
        document
          .getAnimations()
          .every((animation: Animation) => animation.playState !== "running"),
      undefined,
      { timeout: 5_000 },
    )
    .catch(() => undefined);
  // @axe-core/playwright 가 루트 워크스페이스의 다른 playwright-core 버전 타입을 참조하므로 맞춰 준다.
  type AxePage = ConstructorParameters<typeof AxeBuilder>[0]["page"];
  const result = await new AxeBuilder({ page: page as unknown as AxePage })
    .withTags([...WCAG_TAGS])
    .analyze();

  const violations: AxeViolationSummary[] = result.violations.map(
    (violation) => ({
      id: violation.id,
      impact: violation.impact ?? null,
      help: violation.help,
      nodes: violation.nodes.length,
      targets: violation.nodes.slice(0, 3).map((node) => node.target.join(" ")),
    }),
  );

  return {
    violationCount: violations.length,
    violatedNodeCount: violations.reduce(
      (sum: number, violation: AxeViolationSummary) => sum + violation.nodes,
      0,
    ),
    violations,
  };
}

/**
 * 한 화면에서 "조작은 프레임 안, 설명은 프레임 밖, 설명은 현재 단계용" 을 검증하고
 * 같은 화면의 WCAG 2.1 AA 자동 검사 결과를 함께 기록한다.
 */
export async function verifyScreen(
  page: Page,
  spec: ScreenSpec,
  previousGuideHeading: string | null,
): Promise<ScreenEvidence> {
  await expect(page).toHaveURL(spec.url);

  const main: Locator = page.locator("main").first();
  const guideHeading: Locator = guideHeadingLocator(page);
  const control: Locator = spec.frameControl(main);

  // 1) 안내 영역이 현재 단계의 안내로 바뀌었는가
  await expect(guideHeading).toHaveText(spec.guideHeading);
  await expect(control).toBeVisible();
  const headingText: string = normalize(await guideHeading.innerText());

  // 2) 설명은 프레임 바깥(왼쪽), 조작은 프레임 안에 있는가
  //    단계 전환 애니메이션이 끝나 레이아웃이 안정될 때까지 기다리며 측정한다.
  const measureLayout = async (): Promise<{
    guideOutsideFrame: boolean;
    frameControlInsideFrame: boolean;
  }> => {
    const guideBox = await guideHeading.boundingBox();
    const mainBox = await main.boundingBox();
    const controlBox = await control.boundingBox();
    if (!guideBox || !mainBox || !controlBox) {
      return { guideOutsideFrame: false, frameControlInsideFrame: false };
    }
    return {
      guideOutsideFrame: guideBox.x + guideBox.width <= mainBox.x,
      frameControlInsideFrame:
        controlBox.x >= mainBox.x - 1 &&
        controlBox.x + controlBox.width <= mainBox.x + mainBox.width + 1,
    };
  };
  await expect
    .poll(measureLayout, {
      message: `${spec.id}: guide outside frame, control inside frame`,
      timeout: 10_000,
    })
    .toEqual({ guideOutsideFrame: true, frameControlInsideFrame: true });
  const { guideOutsideFrame, frameControlInsideFrame } = await measureLayout();

  // 3) 직전 화면과 다른 안내인가 (의도적으로 공유하는 화면은 제외)
  let guideChangedFromPrevious: boolean | null = null;
  if (previousGuideHeading !== null) {
    guideChangedFromPrevious = headingText !== previousGuideHeading;
    if (!spec.sharesGuideWithPrevious) {
      expect(
        guideChangedFromPrevious,
        `${spec.id}: guide should change when the step changes`,
      ).toBe(true);
    }
  }

  // 4) 안내가 보조기기에서도 "단계 안내" 영역(complementary 랜드마크)으로 구분되는가
  const guideInLandmark: boolean =
    (await page
      .getByRole("complementary", { name: "단계 안내" })
      .locator("h1")
      .filter({ hasText: spec.guideHeading })
      .count()) > 0;
  expect(
    guideInLandmark,
    `${spec.id}: guide must be in a labelled landmark`,
  ).toBe(true);

  const guideSectionHeadings: string[] = await readGuideSectionHeadings(page);

  return {
    id: spec.id,
    label: spec.label,
    flow: spec.flow,
    url: new URL(page.url()).pathname + new URL(page.url()).search,
    guideHeading: headingText,
    guideSectionHeadings,
    hasWhySection: guideSectionHeadings.some((text: string) =>
      text.startsWith("왜"),
    ),
    guideOutsideFrame,
    frameControlInsideFrame,
    guideInLandmark,
    guideChangedFromPrevious,
    axe: await scanAccessibility(page),
  };
}
