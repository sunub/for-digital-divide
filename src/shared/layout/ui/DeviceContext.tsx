"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type DeviceView = "content" | "drawer";

interface DeviceContextType {
  currentView: DeviceView;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const DeviceContext = createContext<DeviceContextType | null>(null);

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentView] = useState<DeviceView>("content");
  const openDrawer = useCallback(() => {
    setCurrentView("drawer");
  }, []);

  const closeDrawer = useCallback(() => {
    setCurrentView("content");
  }, []);

  const contextValue = useMemo(
    () => ({
      currentView,
      openDrawer,
      closeDrawer,
    }),
    [currentView, openDrawer, closeDrawer],
  );

  return (
    <DeviceContext.Provider value={contextValue}>
      {children}
    </DeviceContext.Provider>
  );
}

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
};
