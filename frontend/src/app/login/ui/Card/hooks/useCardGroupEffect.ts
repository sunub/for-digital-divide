import { useEffect, useRef } from "react";

export function useCardGroupEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const handleMouseMove = (e: Event) => {
      const cards =
        container.querySelectorAll<HTMLDivElement>("[data-card=true]");
      cards.forEach((card) => {
        const mouseEvent = e as MouseEvent;
        const { left, top } = card.getBoundingClientRect();
        const x = mouseEvent.clientX - left;
        const y = mouseEvent.clientY - top;
        card.style.setProperty("--mx", `${x}px`);
        card.style.setProperty("--my", `${y}px`);
      });
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return containerRef;
}
