"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ChartViewMode, TimePeriod } from "./types";

interface TransactionSelectedPeriodContextType {
  selectedPeriod: TimePeriod;
  setSelectedPeriod: (period: TimePeriod) => void;
}

interface TransactionViewModeContextType {
  viewMode: ChartViewMode;
  setViewMode: (mode: ChartViewMode) => void;
}

interface TransactionProviderProps {
  children: React.ReactNode;
}

export const TransactionSelectedPeriodContext =
  createContext<TransactionSelectedPeriodContextType | null>(null);

export const TransactionViewModeContext =
  createContext<TransactionViewModeContextType | null>(null);

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("3months");
  const [viewMode, setViewMode] = useState<ChartViewMode>("ALL");

  const setViewModeCallback = useCallback((mode: ChartViewMode) => {
    setViewMode(mode);
  }, []);

  const setSelectedPeriodCallback = useCallback((period: TimePeriod) => {
    setSelectedPeriod(period);
  }, []);

  const selectedPeriodValue = useMemo(
    () => ({
      selectedPeriod,
      setSelectedPeriod: setSelectedPeriodCallback,
    }),
    [selectedPeriod, setSelectedPeriodCallback],
  );

  const viewModeValue = useMemo(
    () => ({
      viewMode,
      setViewMode: setViewModeCallback,
    }),
    [viewMode, setViewModeCallback],
  );

  return (
    <TransactionSelectedPeriodContext.Provider value={selectedPeriodValue}>
      <TransactionViewModeContext.Provider value={viewModeValue}>
        {children}
      </TransactionViewModeContext.Provider>
    </TransactionSelectedPeriodContext.Provider>
  );
}

export const useTransactionSelectedPeriod = () => {
  const context = useContext(TransactionSelectedPeriodContext);
  if (!context) {
    throw new Error(
      "useTransactionSelectedPeriod must be used within a TransactionProvider",
    );
  }
  return context;
};

export const useTransactionViewMode = () => {
  const context = useContext(TransactionViewModeContext);
  if (!context) {
    throw new Error(
      "useTransactionViewMode must be used within a TransactionProvider",
    );
  }
  return context;
};

export const useTransactionContext = () => {
  const selectedPeriodContext = useTransactionSelectedPeriod();
  const viewModeContext = useTransactionViewMode();

  return {
    ...selectedPeriodContext,
    ...viewModeContext,
  };
};
