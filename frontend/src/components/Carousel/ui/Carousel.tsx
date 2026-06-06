"use client";

import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Children, useEffect } from "react";
import { useSelectedSnapDisplay } from "../hooks/useSelectedSnapDisplay";
import * as style from "./Carousel.css";

export function Carousel({
  options,
  children,
  onSlideChange,
}: {
  options?: EmblaOptionsType;
  children: React.ReactNode;
  onSlideChange?: (index: number) => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);
  const CARD_SLOTS = Array.from({ length: snapCount }, (_, i) => i);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      onSlideChange?.(selectedIndex);
    };
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSlideChange]);

  return (
    <section className={style.section}>
      <div ref={emblaRef} className={style.viewport}>
        <div className={style.container}>
          {Children.map(children, (child, _index) => (
            <div className={style.slide} key={CARD_SLOTS[_index]}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className={style.selectedSnapDisplay}>
        <button
          type="button"
          className={style.prevButton}
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ChevronLeftIcon size={32} />
        </button>
        <p>
          {selectedSnap + 1} / {snapCount}
        </p>
        <button
          type="button"
          className={style.nextButton}
          onClick={() => emblaApi?.scrollNext()}
        >
          <ChevronRightIcon size={32} />
        </button>
      </div>
    </section>
  );
}
