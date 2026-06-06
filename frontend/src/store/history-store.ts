import { z } from "zod/v4";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const HistoryUrlSchema = z.url({ message: "유효한 URL 형식이어야 합니다." });
const HistoryStoreSchema = z.object({
  historyList: z
    .array(HistoryUrlSchema, {
      error: "히스토리에는 문자열만 포함할 수 있습니다.",
    })
    .max(10)
    .default([]),
  index: z
    .number({ error: "인덱스는 -1에서 10 사이의 정수여야 합니다." })
    .int()
    .min(-1)
    .max(10)
    .default(-1),
});
export type HistoryStoreState = z.infer<typeof HistoryStoreSchema>;

const INITIAL_HISTORY_STATE: HistoryStoreState = {
  historyList: [],
  index: -1,
};

export const MAX_HISTORY_LENGTH = 10;

interface HistoryStoreActions {
  addHistory: (newHistory: string) => void;
  clearHistory: () => void;
  writeHistory: (newHistory: HistoryStoreState) => void;
  prevHistory: () => void;
  nextHistory: () => void;
  setHistoryState: (state: HistoryStoreState) => void;
}

const customStorage = {
  getItem: (name: string) => {
    const item = sessionStorage.getItem(name);
    if (item === null) return null;
    try {
      const parsed = JSON.parse(item);
      const validated = HistoryStoreSchema.safeParse(parsed.state);
      if (!validated.success) {
        return JSON.stringify({ state: INITIAL_HISTORY_STATE });
      }
      return item;
    } catch {
      return JSON.stringify({ state: INITIAL_HISTORY_STATE });
    }
  },
  setItem: (name: string, value: string) => {
    try {
      const parsed = JSON.parse(value);
      const validated = HistoryStoreSchema.safeParse(parsed.state);
      if (!validated.success) return;
      sessionStorage.setItem(name, value);
    } catch {}
  },
  removeItem: (name: string) => {
    sessionStorage.removeItem(name);
  },
};

export const useHistoryStore = create<
  HistoryStoreState & HistoryStoreActions
>()(
  persist(
    (set, get) => ({
      ...INITIAL_HISTORY_STATE,

      setHistoryState: (state) => {
        const parsed = HistoryStoreSchema.safeParse(state);
        if (!parsed.success) {
          throw new TypeError(parsed.error.message);
        }
        set(parsed.data);
      },

      addHistory: (newHistory) => {
        const parsedNewHistory = HistoryUrlSchema.safeParse(newHistory);
        if (!parsedNewHistory.success) {
          throw new TypeError(parsedNewHistory.error.message);
        }

        const currentHistory = get().historyList;
        const updatedHistory = [...currentHistory, parsedNewHistory.data]
          .filter((url, index, self) => self.indexOf(url) === index)
          .slice(-MAX_HISTORY_LENGTH);
        const updatedIndex = updatedHistory.length - 1;

        set({
          historyList: updatedHistory,
          index: updatedIndex,
        });
      },

      clearHistory: () => {
        set({ historyList: [], index: -1 });
      },

      writeHistory: (newHistory) => {
        const parsedNewHistory = HistoryStoreSchema.safeParse(newHistory);
        if (!parsedNewHistory.success) {
          throw new TypeError(parsedNewHistory.error.message);
        }
        set(parsedNewHistory.data);
      },

      prevHistory: () => {
        const index = get().index;
        if (index <= 0) return;
        set({ index: Math.max(index - 1, 0) });
      },

      nextHistory: () => {
        const { index, historyList } = get();
        if (index >= historyList.length - 1) return;
        set({ index: Math.min(index + 1, MAX_HISTORY_LENGTH - 1) });
      },
    }),
    {
      name: "history",
      storage: createJSONStorage(() => customStorage),
    },
  ),
);
