import { z } from 'zod/v4';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { SyncStorage } from 'jotai/vanilla/utils/atomWithStorage';

const HistoryUrlSchema = z.url({ message: '유효한 URL 형식이어야 합니다.' });
const HistoryStoreSchema = z.object({
  historyList: z
    .array(HistoryUrlSchema, {
      error: '히스토리에는 문자열만 포함할 수 있습니다.',
    })
    .max(10)
    .default([]),
  index: z.number({ error: '인덱스는 -1에서 10 사이의 정수여야 합니다.' }).int().min(-1).max(10).default(-1),
});
type HistoryStore = z.infer<typeof HistoryStoreSchema>;

const INITIAL_HISTORY_STATEL: HistoryStore = {
  historyList: [],
  index: -1,
};

const validateHistory: SyncStorage<HistoryStore> = {
  getItem: key => {
    const history = sessionStorage.getItem(key);
    if (history === null) {
      return INITIAL_HISTORY_STATEL;
    }
    const parsedHistory = JSON.parse(history);
    const parsedResult = HistoryStoreSchema.safeParse(parsedHistory);
    if (!parsedResult.success) {
      console.error('Invalid history format in sessionStorage:', parsedResult.error);
      return INITIAL_HISTORY_STATEL;
    }
    return parsedResult.data;
  },
  setItem: (key, value) => {
    const parsedValue = HistoryStoreSchema.safeParse(value);
    if (!parsedValue.success) {
      console.error('Invalid history format:', parsedValue.error);
      return;
    }
    sessionStorage.setItem(key, JSON.stringify(parsedValue.data));
  },
  removeItem: key => {
    sessionStorage.removeItem(key);
  },
};

export const MAX_HISTORY_LENGTH = 10;
export const historyAtom = atomWithStorage<HistoryStore>('history', INITIAL_HISTORY_STATEL, validateHistory);

export const currentHistoryItemAtom = atom(get => {
  const { historyList, index } = get(historyAtom);
  if (index === -1 || !historyList[index]) {
    return historyList[0] || null;
  }
  return historyList[index];
});
export const readHistoryAtom = atom(get => get(historyAtom));
export const addHistoryAtom = atom(null, (get, set, newHistory: string) => {
  const parsedNewHistory = HistoryUrlSchema.safeParse(newHistory);
  if (!parsedNewHistory.success) {
    throw new TypeError(parsedNewHistory.error.message);
  }

  const currentHistory = get(historyAtom).historyList;
  const updatedHistory = [...currentHistory, parsedNewHistory.data]
    .filter((url, index, self) => self.indexOf(url) === index)
    .slice(-MAX_HISTORY_LENGTH);
  const updatedIndex = updatedHistory.length - 1;
  set(historyAtom, {
    historyList: updatedHistory,
    index: updatedIndex,
  });
});
export const clearHistoryAtom = atom(null, (get, set) => {
  set(historyAtom, { historyList: [], index: -1 });
});
export const writeHistoryAtom = atom(null, (get, set, newHistory: HistoryStore) => {
  const parsedNewHistory = HistoryStoreSchema.safeParse(newHistory);
  if (!parsedNewHistory.success) {
    throw new TypeError(parsedNewHistory.error.message);
  }
  set(historyAtom, parsedNewHistory.data);
});
export const prevHistoryAtom = atom(null, (get, set) => {
  const currentHistory = get(historyAtom);
  if (currentHistory.index <= 0) {
    return;
  }
  const newIndex = Math.max(currentHistory.index - 1, 0);
  set(historyAtom, {
    ...currentHistory,
    index: newIndex,
  });
});

export const nextHistoryAtom = atom(null, (get, set) => {
  const currentHistory = get(historyAtom);
  if (currentHistory.index >= currentHistory.historyList.length - 1) {
    return;
  }

  set(historyAtom, {
    ...currentHistory,
    index: Math.min(currentHistory.index + 1, MAX_HISTORY_LENGTH - 1),
  });
});
