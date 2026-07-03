import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, test } from "vitest";

const appDir = path.resolve(__dirname, "../src/app");

async function readAppFile(relativePath: string): Promise<string> {
  return readFile(path.join(appDir, relativePath), "utf8");
}

describe("dashboard transfer routing", () => {
  test("serves transfer as a dashboard child route", async () => {
    await expect(readAppFile("dashboard/transfer/page.tsx")).resolves.toContain(
      "TransferContentContainer",
    );
    await expect(readAppFile("transfer/page.tsx")).rejects.toMatchObject({
      code: "ENOENT",
    });
  });

  test("dashboard loading keeps the dashboard shell and uses design-system Loading", async () => {
    const source = await readAppFile("dashboard/loading.tsx");

    expect(source).toContain("@internal/design-system/components");
    expect(source).toContain("<Loading");
    expect(source).toContain("<DashboardGuide");
    expect(source).toContain("<Device.Frame");
  });

  test("returning from transfer to dashboard resets transfer state", async () => {
    const source = await readAppFile(
      "dashboard/transfer/steps/RecipientSelectionStep/RecipientSelectionStep.tsx",
    );

    expect(source).toContain("resetTransfer");
    expect(source).toContain('router.replace("/dashboard")');
  });
});

describe("device back button", () => {
  test("navigates to the computed previous history entry", async () => {
    const source = await readFile(
      path.resolve(__dirname, "../src/shared/layout/ui/buttons/BackButton.tsx"),
      "utf8",
    );

    expect(source).toContain("router.push(prevHistory)");
    expect(source).not.toContain("router.push(currentItem");
  });
});
