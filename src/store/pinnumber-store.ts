import { createStore } from 'zustand';

export type Status = 'idle' | 'pending' | 'resolved' | 'rejected';

export type NumpadState = {
  numpad: string[];
  status: Status;
};

export type NumpadActions = {
  updateStatus: (newStatus: Status) => void;
  updateNumpad: (newNumpad: string) => void;
  deleteNumpad: () => void;
};

export type NumpadStore = NumpadState & NumpadActions;

export const defaultInitState: NumpadState = {
  numpad: Array.from({ length: 4 }, () => ''),
  status: 'idle',
};

export const defaultSubmitInitState: NumpadState = {
  numpad: [],
  status: 'idle',
};

export const createNumpadStore = (
  initState: NumpadState = defaultInitState,
) => {
  return createStore<NumpadStore>()((set) => ({
    ...initState,
    updateStatus: (newStatus: Status) => {
      set(() => {
        return {
          status: newStatus,
        };
      });
    },
    updateNumpad: (numpad) => {
      set((state) => {
        const newNumpad = [...state.numpad];
        const firstInputIndex = state.numpad.findIndex((v) => v === '');
        newNumpad[firstInputIndex] = numpad;
        return { numpad: newNumpad };
      });
    },
    deleteNumpad: () => {
      set(() => {
        return { numpad: Array.from({ length: 4 }, () => '') };
      });
    },
  }));
};

export const createSumbitNumpadStore = (
  initState: NumpadState = defaultSubmitInitState,
) => {
  return createStore<NumpadStore>()((set) => ({
    ...initState,
    updateStatus: (newStatus: Status) => {
      set(() => {
        return {
          status: newStatus,
        };
      });
    },
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
