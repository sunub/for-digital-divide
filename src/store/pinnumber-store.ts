import { createStore } from 'zustand';

export type NumpadState = {
  numpad: string;
};

export type NumpadActions = {
  updateNumpad: (newNumpad: string) => void;
};

export type NumpadStore = NumpadState & NumpadActions;

export const defaultInitState: NumpadState = {
  numpad: '',
};

export const createNumpadStore = (
  initState: NumpadState = defaultInitState,
) => {
  return createStore<NumpadStore>()((set) => ({
    ...initState,
    updateNumpad: (newNumpad: string) =>
      set((state) => ({ numpad: state.numpad + newNumpad })),
  }));
};
