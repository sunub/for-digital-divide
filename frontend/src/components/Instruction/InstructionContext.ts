import { createContext } from "react";

export interface InstructionListContextValue {
  activeStep?: number;
}

export const InstructionListContext =
  createContext<InstructionListContextValue | null>(null);
