"use client";

import React, { type ReactNode } from "react";
import { type StoreApi, useStore } from "zustand";
import { createNumpadStore, type NumpadStore } from "@/store/pinnumber-store";

export const NumpadContext = React.createContext<StoreApi<NumpadStore> | null>(
  null,
);

export const SubmitContext = React.createContext<StoreApi<NumpadStore> | null>(
  null,
);

export interface NumpadProviderProps {
  children: ReactNode;
}

export const NumpadProvider = ({ children }: NumpadProviderProps) => {
  const numpadRef = React.useRef<StoreApi<NumpadStore> | null>(null);

  if (!numpadRef.current) numpadRef.current = createNumpadStore();

  return (
    <NumpadContext.Provider value={numpadRef.current}>
      {children}
    </NumpadContext.Provider>
  );
};

export const useNumpadStore = <T,>(selector: (store: NumpadStore) => T): T => {
  const numpadStoreContext = React.useContext(NumpadContext);

  if (!numpadStoreContext) {
    throw new Error(`useNumpadStore must be used within NumpadProvider`);
  }

  return useStore(numpadStoreContext, selector);
};

export const useSubmitNumpadStroe = <T,>(
  selector: (store: NumpadStore) => T,
): T => {
  const numpadStoreContext = React.useContext(SubmitContext);

  if (!numpadStoreContext) {
    throw new Error(`useSubmitNumpadStore must be used within NumpadProvider`);
  }

  return useStore(numpadStoreContext, selector);
};
