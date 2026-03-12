import { create } from "zustand";
import type { DailyData, Position } from "../types";

type InteractionState = {
  hoverData: DailyData | null;
  hoverPos: Position | null;
};

type InteractionAction = {
  setHoverState: (data: DailyData | null, pos: Position | null) => void;
  clearHoverState: () => void;
  setHoverData: (data: DailyData | null) => void;
  setHoverPos: (pos: Position | null) => void;
};

export const useInteractionStore = create<InteractionState & InteractionAction>(
  (set) => ({
    hoverData: null,
    hoverPos: null,
    setHoverState: (data, pos) => set({ hoverData: data, hoverPos: pos }),
    clearHoverState: () => set({ hoverData: null, hoverPos: null }),
    setHoverData: (data) => set({ hoverData: data }),
    setHoverPos: (pos) => set({ hoverPos: pos }),
  }),
);
