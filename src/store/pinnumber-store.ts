import { createStore } from 'zustand';

export type NumpadState = {
  numpad: string[];
};

export type NumpadActions = {
  updateNumpad: (newNumpad: string) => void;
  deleteNumpad: () => void;
};

export type NumpadStore = NumpadState & NumpadActions;

export const defaultInitState: NumpadState = {
  numpad: [],
};

export const defaultSubmitInitState: NumpadState = {
  numpad: [],
};

export const createNumpadStore = (
  initState: NumpadState = defaultInitState,
) => {
  return createStore<NumpadStore>()((set) => ({
    ...initState,
    updateNumpad: (newNumpad) => {
      set((state) => {
        if (state.numpad.length >= 4) return state;
        return { numpad: [...state.numpad, newNumpad] };
      });
    },
    deleteNumpad: () => {
      set(() => {
        return { numpad: [] };
      });
    },
  }));
};

export const createSumbitNumpadStore = (
  initState: NumpadState = defaultSubmitInitState,
) => {
  return createStore<NumpadStore>()((set) => ({
    ...initState,
    updateNumpad: (newNumpad) => {
      set((state) => {
        if (state.numpad.length >= 4) return state;
        return { numpad: [...state.numpad, newNumpad] };
      });
    },
    deleteNumpad: () => {
      set(() => {
        return { numpad: [] };
      });
    },
  }));
};
