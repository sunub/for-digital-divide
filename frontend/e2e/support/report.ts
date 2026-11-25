import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const EVIDENCE_DIR: string = fileURLToPath(
  new URL("../../reports/ux-evidence/", import.meta.url),
);

export async function writeEvidence(
  fileName: string,
  payload: unknown,
): Promise<void> {
  try {
    await mkdir(EVIDENCE_DIR, { recursive: true });
    await writeFile(
      path.join(EVIDENCE_DIR, fileName),
      `${JSON.stringify(payload, null, 2)}\n`,
      "utf8",
    );
  } catch (error: unknown) {
    const message: string =
      error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to write evidence file ${fileName}: ${message}`);
  }
}
