import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  currentHistoryItemAtom,
  addHistoryAtom,
  writeHistoryAtom,
  clearHistoryAtom,
  nextHistoryAtom,
  MAX_HISTORY_LENGTH,
  historyAtom,
} from '@/store/history-store';

export const useHistory = () => {
  const [history, setHistory] = useAtom(historyAtom);
  const currentItem = useAtomValue(currentHistoryItemAtom);
  const add = useSetAtom(addHistoryAtom);
  const write = useSetAtom(writeHistoryAtom);
  const clear = useSetAtom(clearHistoryAtom);
  const next = useSetAtom(nextHistoryAtom);

  const goBack = () => {
    if (!canGoPrev) {
      return null;
    }
    const newIndex = history.index - 1;
    const prevItemUrl = history.historyList[newIndex];

    setHistory({
      ...history,
      index: newIndex,
    });
    return prevItemUrl;
  };

  const canGoPrev = history.index - 1 >= 0;
  const canGoNext = history.index + 1 < history.historyList.length && history.index + 1 < MAX_HISTORY_LENGTH;

  return {
    currentItem,
    add,
    write,
    clear,
    goBack,
    next,
    canGoPrev,
    canGoNext,
  };
};
