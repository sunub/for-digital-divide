"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ChartViewMode, TimePeriod } from "../types";

interface TransactionContextType {
  selectedPeriod: TimePeriod;
  viewMode: ChartViewMode;
  setViewMode: (mode: ChartViewMode) => void;
  setSelectedPeriod: (period: TimePeriod) => void;
}

interface TransactionProviderProps {
  children: React.ReactNode;
}

export const TransactionContext = createContext<TransactionContextType | null>(
  null,
);

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("3months");
  const [viewMode, setViewMode] = useState<ChartViewMode>("ALL");

  const setViewModeCallback = useCallback((mode: ChartViewMode) => {
    setViewMode(mode);
  }, []);

  const setSelectedPeriodCallback = useCallback((period: TimePeriod) => {
    setSelectedPeriod(period);
  }, []);

  const value = useMemo(
    () => ({
      selectedPeriod,
      viewMode,
      setViewMode: setViewModeCallback,
      setSelectedPeriod: setSelectedPeriodCallback,
    }),
    [selectedPeriod, viewMode, setViewModeCallback, setSelectedPeriodCallback],
  );

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider",
    );
  }
  return context;
};
