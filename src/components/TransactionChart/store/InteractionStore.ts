import { create } from "zustand";
import type { DailyData, Position } from "../types";

type InteractionState = {
  hoverData: DailyData | null;
  hoverPos: Position | null;
};

type InteractionAction = {
  setHoverData: (data: DailyData | null) => void;
  setHoverPos: (pos: Position | null) => void;
};

export const useInteractionStore = create<InteractionState & InteractionAction>(
  (set) => ({
    hoverData: null,
    hoverPos: null,
    setHoverData: (data) => set({ hoverData: data }),
    setHoverPos: (pos) => set({ hoverPos: pos }),
  }),
);
