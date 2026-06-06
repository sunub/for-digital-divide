import { createStore } from "zustand";

export type Status = "idle" | "pending" | "resolved" | "rejected";

export type Axis = {
  x: number;
  y: number;
};

export type NumpadState = {
  numpad: Axis[];
  status: Status;
};

export type NumpadActions = {
  updateStatus: (newStatus: Status) => void;
  updateNumpad: (newNumpad: Axis) => void;
  deleteNumpad: () => void;
};

export type NumpadStore = NumpadState & NumpadActions;

export const defaultInitState: NumpadState = {
  numpad: Array.from({ length: 4 }, () => ({ x: 1000, y: 1000 })),
  status: "idle",
};

export const defaultSubmitInitState: NumpadState = {
  numpad: [],
  status: "idle",
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
        const firstInputIndex = state.numpad.findIndex(
          (v) => v.x === 1000 && v.y === 1000,
        );
        if (firstInputIndex === -1) {
          return state;
        }
        newNumpad[firstInputIndex] = numpad;
        return { numpad: newNumpad };
      });
    },
    deleteNumpad: () => {
      set(() => {
        return {
          numpad: Array.from({ length: 4 }, () => ({ x: 1000, y: 1000 })),
        };
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
