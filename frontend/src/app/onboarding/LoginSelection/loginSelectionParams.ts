export type LoginSelectionMethod = "email" | "pin";
export type LoginSelectionStep = "register" | "login";

type RawLoginSelectionParams = {
  method?: string | string[];
  step?: string | string[];
};

export type LoginSelectionView =
  | { view: "selection" }
  | {
      view: "step";
      method: LoginSelectionMethod;
      step: LoginSelectionStep;
    };

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function isLoginSelectionMethod(
  value: string | undefined,
): value is LoginSelectionMethod {
  return value === "email" || value === "pin";
}

function isLoginSelectionStep(
  value: string | undefined,
): value is LoginSelectionStep {
  return value === "register" || value === "login";
}

export function parseLoginSelectionParams(
  params: RawLoginSelectionParams,
): LoginSelectionView {
  const method = firstParam(params.method);
  const step = firstParam(params.step);

  if (!isLoginSelectionMethod(method) || !isLoginSelectionStep(step)) {
    return { view: "selection" };
  }

  return { view: "step", method, step };
}
