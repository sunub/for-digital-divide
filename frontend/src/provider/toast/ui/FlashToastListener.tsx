"use client";

import { useEffect } from "react";
import { useToast } from "@/provider/toast/hooks/useToast";
import { getFlashToastCookie } from "./cookie";

export function FlashToastListener() {
  const showToast = useToast();

  useEffect(() => {
    async function flashToastListener() {
      const message = await getFlashToastCookie();
      if (message) {
        showToast("info", message);
      }
    }
    flashToastListener();
  }, [showToast]);

  return null;
}
