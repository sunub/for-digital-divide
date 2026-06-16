import type { StateCreator } from "zustand";
import type { IdCardActions, IdCardState, OnboardingStore } from "../types";

export type IdCardSlice = IdCardState & IdCardActions;

export const initialIdCardState: IdCardState = {
  selectedIdCardType: null,
  idCardName: "",
  idCardResidentNumber: "",
  idCardIssueDate: "",
  isIdCardVerified: false,
};

export const createIdCardSlice: StateCreator<
  OnboardingStore,
  [],
  [],
  IdCardSlice
> = (set) => ({
  ...initialIdCardState,
  setSelectedIdCardType: (type) => set({ selectedIdCardType: type }),
  setIdCardDetails: (details) => set(details),
  setIdCardVerified: (verified) => set({ isIdCardVerified: verified }),
});
