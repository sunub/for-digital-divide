"use client";

import { createContext, useContext, useState } from "react";

type DeviceView = "content" | "drawer";

interface DeviceContextType {
  currentView: DeviceView;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const DeviceContext = createContext<DeviceContextType | null>(null);

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [currentView, setCurrentView] = useState<DeviceView>("content");

  return (
    <DeviceContext.Provider
      value={{
        currentView,
        openDrawer: () => setCurrentView("drawer"),
        closeDrawer: () => setCurrentView("content"),
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
}

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) throw new Error("useDevice must be used within DeviceProvider");
  return context;
};
