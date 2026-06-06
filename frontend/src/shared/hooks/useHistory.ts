import { useHistoryStore, MAX_HISTORY_LENGTH } from "@/store/history-store";

export const useHistory = () => {
  const historyList = useHistoryStore((state) => state.historyList);
  const index = useHistoryStore((state) => state.index);

  const currentItem = useHistoryStore((state) => {
    const { historyList, index } = state;
    if (index === -1 || !historyList[index]) {
      return historyList[0] || null;
    }
    return historyList[index];
  });

  const add = useHistoryStore((state) => state.addHistory);
  const write = useHistoryStore((state) => state.writeHistory);
  const clear = useHistoryStore((state) => state.clearHistory);
  const next = useHistoryStore((state) => state.nextHistory);
  const setHistoryState = useHistoryStore((state) => state.setHistoryState);

  const canGoPrev = index - 1 >= 0;
  const canGoNext =
    index + 1 < historyList.length &&
    index + 1 < MAX_HISTORY_LENGTH;

  const goBack = () => {
    if (!canGoPrev) {
      return null;
    }
    const newIndex = index - 1;
    const prevItemUrl = historyList[newIndex];

    setHistoryState({
      historyList,
      index: newIndex,
    });
    return prevItemUrl;
  };

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
