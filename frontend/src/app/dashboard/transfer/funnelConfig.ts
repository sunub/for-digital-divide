import type { StepConfig } from "@/shared/hooks/useFunnel/types";

export const TRANSFER_STEPS: StepConfig<unknown>[] = [
  {
    id: "recipient-selection",
  },
  {
    id: "recipient-input",
  },
  {
    id: "amount-input",
  },
  {
    id: "summary",
  },
  {
    id: "confirm-pin",
  },
  {
    id: "success",
  },
];
