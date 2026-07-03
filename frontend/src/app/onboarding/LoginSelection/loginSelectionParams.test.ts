import { describe, expect, it } from "vitest";
import { parseLoginSelectionParams } from "./loginSelectionParams";

describe("parseLoginSelectionParams", () => {
  it("returns base selection for missing query params", () => {
    expect(parseLoginSelectionParams({})).toEqual({ view: "selection" });
  });

  it("accepts supported email and pin steps", () => {
    expect(
      parseLoginSelectionParams({ method: "email", step: "register" }),
    ).toEqual({ view: "step", method: "email", step: "register" });
    expect(parseLoginSelectionParams({ method: "pin", step: "login" })).toEqual(
      { view: "step", method: "pin", step: "login" },
    );
  });

  it("falls back to base selection for invalid query combinations", () => {
    expect(
      parseLoginSelectionParams({ method: "email", step: "unknown" }),
    ).toEqual({ view: "selection" });
    expect(
      parseLoginSelectionParams({ method: "oauth", step: "register" }),
    ).toEqual({ view: "selection" });
  });
});
