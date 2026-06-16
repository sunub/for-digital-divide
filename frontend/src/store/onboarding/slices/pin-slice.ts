import type { StateCreator } from "zustand";
import type { OnboardingStore, PinActions, PinState } from "../types";

export type PinSlice = PinState & PinActions;

export const initialPinState: PinState = {
  pinNumber: "",
  isPinRegistered: false,
};

export const createPinSlice: StateCreator<OnboardingStore, [], [], PinSlice> = (
  set,
) => ({
  ...initialPinState,
  setPinNumber: (pin) => set({ pinNumber: pin }),
  setPinRegistered: (registered) => set({ isPinRegistered: registered }),
});
