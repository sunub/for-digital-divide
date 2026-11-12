import type { Locator, Page } from "@playwright/test";

/**
 * 보안 키패드는 숫자를 DOM 텍스트 대신 CSS 스프라이트 좌표로 그린다.
 * 서버(getKeypadData)의 NUMPAD_AXIS 와 같은 좌표표로 버튼 → 숫자를 역산한다.
 */
const SPRITE_AXIS_TO_DIGIT: Readonly<Record<string, number>> = {
  "0,0": 2,
  "-40,0": 0,
  "-80,0": 1,
  "0,-50": 9,
  "-40,-50": 3,
  "-80,-50": 8,
  "0,-100": 5,
  "-40,-100": 6,
  "-80,-100": 4,
  "-40,-150": 7,
};

async function buildDigitMap(page: Page): Promise<Map<number, Locator>> {
  const buttons: Locator = page.locator("main li button");
  const count: number = await buttons.count();
  const digitMap: Map<number, Locator> = new Map();

  for (let index = 0; index < count; index += 1) {
    const button: Locator = buttons.nth(index);
    const style: string | null = await button
      .locator("span[aria-hidden]")
      .getAttribute("style");
    if (!style) continue;

    const offsets: string[] = [...style.matchAll(/(-?\d+)px/g)].map(
      (match: RegExpMatchArray) => match[1],
    );
    const digit: number | undefined = SPRITE_AXIS_TO_DIGIT[offsets.join(",")];
    if (digit !== undefined) digitMap.set(digit, button);
  }

  return digitMap;
}

export async function pressSecurePin(page: Page, pin: string): Promise<void> {
  await page.locator("main li button span[aria-hidden]").first().waitFor();
  const digitMap: Map<number, Locator> = await buildDigitMap(page);

  for (const char of pin) {
    const button: Locator | undefined = digitMap.get(Number(char));
    if (!button) {
      throw new Error(`Secure keypad has no button for digit ${char}`);
    }
    await button.click();
  }
}
