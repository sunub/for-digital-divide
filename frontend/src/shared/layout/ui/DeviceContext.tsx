"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type DeviceView = "content" | "drawer";

interface DeviceContextType {
  currentView: DeviceView;
  openDrawer: () => void;
  closeDrawer: () => void;
}

interface DeviceProviderProps {
  children: React.ReactNode;
  defaultView?: DeviceView;
}

const DeviceContext = createContext<DeviceContextType | null>(null);

export function DeviceProvider({
  children,
  defaultView = "content",
}: DeviceProviderProps) {
  const [currentView, setCurrentView] = useState<DeviceView>(defaultView);
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

export const useEnsureDeviceContext = () => {
  useDevice();
};
