export type ToastType = "success" | "error" | "info" | "warning";

export type Toast = {
  id: string;
  message: string[];
  type: ToastType;
};
