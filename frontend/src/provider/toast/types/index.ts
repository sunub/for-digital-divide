import type React from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export type Toast = {
  id: string;
  type: ToastType;
  duration?: number;
  message?: string[];
  title?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};
