import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ScreenEvidence } from "./support/checkpoint";
import { EVIDENCE_DIR } from "./support/report";

/**
 * e2e/*.spec.ts 가 남긴 JSON 근거를 이력서·포트폴리오에서 인용할 수 있는 Markdown 으로 정리한다.
 * 실행: pnpm e2e:report
 */

interface GuideSyncEvidence {
  generatedAt: string;
  axeTags: string[];
  totals: {
    screens: number;
    guideOutsideFrame: number;
    frameControlInsideFrame: number;
    /** 기준선(수정 전) 측정에는 없는 항목 */
    guideInLandmark?: number;
    guideChangedOnStepChange: number;
    screensWithWhySection: number;
    screensWithAxeViolations: number;
    /** 기준선(수정 전) 측정에는 없는 항목 */
    screensWithUndersizedTargets?: number;
  };
  balanceObservation: {
    amountInputStep: string | null;
    summaryStep: string | null;
    consistent: boolean;
  };
  screens: ScreenEvidence[];
}

interface SensitiveEvidence {
  generatedAt: string;
  totals: { checks: number; passed: number };
  checks: { name: string; passed: boolean; detail: string }[];
}

interface AxeSummary {
  ruleCount: number;
  nodeCount: number;
  screensWithViolations: number;
}

function summarizeAxe(screens: ScreenEvidence[]): AxeSummary {
  const rules: Set<string> = new Set();
  let nodeCount = 0;
  for (const screen of screens) {
    for (const violation of screen.axe.violations) {
      rules.add(violation.id);
      nodeCount += violation.nodes;
    }
  }
  return {
    ruleCount: rules.size,
    nodeCount,
    screensWithViolations: screens.filter(
      (screen: ScreenEvidence) => screen.axe.violationCount > 0,
    ).length,
  };
}

async function readOptionalJson<T>(fileName: string): Promise<T | null> {
  try {
    const raw: string = await readFile(
      path.join(EVIDENCE_DIR, fileName),
      "utf8",
    );
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function readJson<T>(fileName: string): Promise<T> {
  try {
    const raw: string = await readFile(
      path.join(EVIDENCE_DIR, fileName),
      "utf8",
    );
    return JSON.parse(raw) as T;
  } catch (error: unknown) {
    const message: string =
      error instanceof Error ? error.message : String(error);
    throw new Error(
      `Run the E2E specs first (missing ${fileName}): ${message}`,
    );
  }
}

function axeRuleTable(screens: ScreenEvidence[]): string {
  const byRule: Map<
    string,
    { impact: string; screens: number; nodes: number; help: string }
  > = new Map();
  for (const screen of screens) {
    for (const violation of screen.axe.violations) {
      const current = byRule.get(violation.id) ?? {
        impact: violation.impact ?? "-",
        screens: 0,
        nodes: 0,
        help: violation.help,
      };
      current.screens += 1;
      current.nodes += violation.nodes;
      byRule.set(violation.id, current);
    }
  }
  if (byRule.size === 0) {
    return "위반 없음 (모든 화면 0건)";
  }
  const rows: string[] = [...byRule.entries()]
    .sort((a, b) => b[1].screens - a[1].screens)
    .map(
      ([id, info]) =>
        `| \`${id}\` | ${info.impact} | ${info.screens} | ${info.nodes} | ${info.help} |`,
    );
  return [
    "| 규칙 | 영향도 | 위반 화면 수 | 위반 요소 수 | 설명 |",
    "|---|---|---|---|---|",
    ...rows,
  ].join("\n");
}

function screenTable(screens: ScreenEvidence[]): string {
  const rows: string[] = screens.map(
    (screen: ScreenEvidence, index: number) =>
      `| ${index + 1} | ${screen.flow} | ${screen.label} | ${screen.guideHeading} | ${
        screen.guideSectionHeadings.join(" / ") || "-"
      } | ${screen.guideOutsideFrame && screen.frameControlInsideFrame ? "✅" : "❌"} | ${
        screen.guideChangedFromPrevious === null
          ? "시작"
          : screen.guideChangedFromPrevious
            ? "✅"
            : "공유(의도)"
      } | ${screen.axe.violationCount} |`,
  );
  return [
    "| # | 흐름 | 화면 | 안내 제목 | 안내 소제목 | 조작/설명 분리 | 단계 전환 시 안내 변경 | axe 위반 규칙 수 |",
    "|---|---|---|---|---|---|---|---|",
    ...rows,
  ].join("\n");
}

async function main(): Promise<void> {
  const guide: GuideSyncEvidence =
    await readJson<GuideSyncEvidence>("guide-sync.json");
  const sensitive: SensitiveEvidence = await readJson<SensitiveEvidence>(
    "sensitive-feedback.json",
  );
  const t = guide.totals;
  const transitions: number = t.screens - 1;
  const baselineGuide: GuideSyncEvidence | null =
    await readOptionalJson<GuideSyncEvidence>("baseline/guide-sync.json");
  const baselineSensitive: SensitiveEvidence | null =
    await readOptionalJson<SensitiveEvidence>(
      "baseline/sensitive-feedback.json",
    );
  const after: AxeSummary = summarizeAxe(guide.screens);
  const comparison: string =
    baselineGuide && baselineSensitive
      ? (() => {
          const before: AxeSummary = summarizeAxe(baselineGuide.screens);
          return `## 0. 수정 전후 비교

| 지표 | 수정 전 (${baselineGuide.generatedAt.slice(0, 10)}) | 수정 후 (${guide.generatedAt.slice(0, 10)}) |
|---|---|---|
| axe 위반 규칙 종류 | ${before.ruleCount}종 | **${after.ruleCount}종** |
| axe 위반 요소 수 | ${before.nodeCount}개 | **${after.nodeCount}개** |
| 위반이 있는 화면 | ${before.screensWithViolations}/${baselineGuide.totals.screens} | **${after.screensWithViolations}/${t.screens}** |
| 민감 단계 피드백 검사 | ${baselineSensitive.totals.passed}/${baselineSensitive.totals.checks} | **${sensitive.totals.passed}/${sensitive.totals.checks}** |
| 안내가 "단계 안내" 랜드마크 안에 있음 | 측정 안 함 (랜드마크 없음) | **${t.guideInLandmark ?? "-"}/${t.screens}** |

> 측정 방식 차이: 수정 후 측정은 axe 검사 전에 진행 중인 애니메이션이 끝나기를 기다립니다. 수정 전 위반 요소 중 일부(토스트가 나타나거나 사라지는 중의 반투명 글자)는 이 차이 때문에 함께 집계되었습니다.
> 수정 전 원본: \`reports/ux-evidence/baseline/\`

### 수정 전 axe 위반 규칙

${axeRuleTable(baselineGuide.screens)}

`;
        })()
      : "";

  const wcagVersionLabel: string = guide.axeTags.includes("wcag22aa")
    ? "WCAG 2.2 AA"
    : "WCAG 2.1 AA";
  const targetSizeRow: string =
    t.screensWithUndersizedTargets !== undefined
      ? `\n| WCAG 2.2 타깃 크기(24×24 CSS px) | **미달 화면 ${t.screensWithUndersizedTargets}/${t.screens}** | \`SC 2.5.8\` |`
      : "";

  const markdown: string = `# UX 설계 검증 근거 (for-digital-divide)

> 자동 생성 파일입니다. \`pnpm e2e\` 실행 후 \`pnpm e2e:report\` 로 다시 만듭니다.
> 측정: guide-sync ${guide.generatedAt} · sensitive-feedback ${sensitive.generatedAt}
> 환경: 로컬 PostgreSQL, Next.js dev 서버, Desktop Chrome 1440×900

${comparison}## 1. 요약

| 항목 | 결과 | 근거 |
|---|---|---|
| 실제로 진행한 사용자 여정 화면 | **${t.screens}개** (온보딩 → 로그인 → PIN 등록 → 대시보드 → 송금) | \`e2e/guide-sync.spec.ts\` |
| 조작은 프레임 안, 설명은 프레임 밖 | **${t.guideOutsideFrame}/${t.screens}** 화면 | 레이아웃 박스 측정 |
| 안내가 "단계 안내" 랜드마크(aside) 안에 있음 | **${t.guideInLandmark ?? "-"}/${t.screens}** 화면 | 접근성 트리 조회 |
| 단계가 바뀔 때 안내도 바뀜 | **${t.guideChangedOnStepChange}/${transitions}** 전환 (나머지는 가입→로그인 의도적 공유) | 안내 제목 비교 |
| 안내에 "왜" 소제목 포함 | ${t.screensWithWhySection}/${t.screens} 화면 | 안내 소제목 수집 |
| 민감 단계(OTP) 피드백 검사 | **${sensitive.totals.passed}/${sensitive.totals.checks}** 통과 | \`e2e/sensitive-feedback.spec.ts\` |
| ${wcagVersionLabel} 자동 검사(axe) | **위반 ${after.ruleCount}종 · ${after.nodeCount}개 요소 · ${t.screensWithAxeViolations}/${t.screens} 화면** | \`${guide.axeTags.join(", ")}\` |${targetSizeRow}

## 2. 화면별 결과

${screenTable(guide.screens)}

## 3. 민감 단계 피드백

| 검사 | 결과 | 내용 |
|---|---|---|
${sensitive.checks.map((c) => `| \`${c.name}\` | ${c.passed ? "✅" : "❌"} | ${c.detail} |`).join("\n")}

## 4. 접근성 자동 검사 (axe, ${wcagVersionLabel})

${axeRuleTable(guide.screens)}

## 5. 관찰값

- 송금 단계 간 잔액 표시: 금액 입력 ${guide.balanceObservation.amountInputStep ?? "-"}원 / 최종 확인 ${guide.balanceObservation.summaryStep ?? "-"}원 → ${guide.balanceObservation.consistent ? "일치" : "불일치"}
`;

  try {
    await writeFile(path.join(EVIDENCE_DIR, "README.md"), markdown, "utf8");
    console.info(`Wrote ${path.join(EVIDENCE_DIR, "README.md")}`);
  } catch (error: unknown) {
    const message: string =
      error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to write report: ${message}`);
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
