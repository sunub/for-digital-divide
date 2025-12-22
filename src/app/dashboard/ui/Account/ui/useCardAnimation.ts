import type { RefObject } from "react";
import { useEffect } from "react";

export function useCardAnimation(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const { left, top } = el.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
        rafId = null;
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [ref]);
}
