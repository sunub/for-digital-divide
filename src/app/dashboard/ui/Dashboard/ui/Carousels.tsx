'use client';

import styled from 'styled-components';
import React, { useEffect, useRef, useState, useCallback } from 'react';

const SNAP_POINTS = [62.5, -223.5, -523.5, -823.5, -1125.5];

// const SLIDE_GAP = 16;
const SLIDE_SIZE = 385;
const SLIDE_HEIGHT = '12rem';
const SLIDE_SPACING = '1rem';

interface DragState {
  isDragging: boolean;
  startX: number;
  startTranslateX: number;
}

export function Carousels({ children }: { children: React.ReactNode }) {
  // const [index, setIndex] = useState(0);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    startTranslateX: 0,
  });

  const handlePointerDown = useCallback((e: PointerEvent) => {
    if (!carouselContainerRef.current) return;
    // Ensure the drag starts within the carousel
    const target = e.target as HTMLElement;
    if (carouselContainerRef.current.contains(target)) {
      e.preventDefault();
      const container = carouselContainerRef.current;
      container.style.transition = 'none'; // Disable transition for immediate drag response

      setDragState({
        isDragging: true,
        startX: e.pageX,
        startTranslateX: new DOMMatrix(getComputedStyle(container).transform).m41,
      });
    }
  }, []);

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!dragState.isDragging || !carouselContainerRef.current) return;
      e.preventDefault();
      const currentX = e.pageX;
      const walk = currentX - dragState.startX;
      const newTranslateX = dragState.startTranslateX + walk;
      carouselContainerRef.current.style.transform = `translate3d(${newTranslateX}px, 0px, 0px)`;
    },
    [dragState.isDragging, dragState.startX, dragState.startTranslateX],
  );

  const handlePointerUp = useCallback(() => {
    if (!dragState.isDragging || !carouselContainerRef.current) return;

    const container = carouselContainerRef.current;
    const currentTransform = new DOMMatrix(getComputedStyle(container).transform);
    const currentTranslateX = currentTransform.m41;

    const targetTranslateX = SNAP_POINTS.reduce((prev, curr) =>
      Math.abs(curr - currentTranslateX) < Math.abs(prev - currentTranslateX) ? curr : prev,
    );

    // const targetIndex = SNAP_POINTS.indexOf(targetTranslateX);

    container.style.transition = 'transform 300ms ease-out';
    container.style.transform = `translate3d(${targetTranslateX}px, 0px, 0px)`;

    // setIndex(targetIndex);
    setDragState((prev) => ({ ...prev, isDragging: false }));
  }, [dragState.isDragging]);

  useEffect(() => {
    window.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [handlePointerDown]);

  useEffect(() => {
    if (dragState.isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [dragState.isDragging, handlePointerMove, handlePointerUp]);

  return (
    <RootContainer $slideSize={SLIDE_SIZE} $slideSpacing={SLIDE_SPACING} $slideHeight={SLIDE_HEIGHT}>
      <CarouselViewport>
        <CarouselContainer ref={carouselContainerRef}>
          {React.Children.map(children, (child, i) => (
            <CarouselSlide key={`carousel-slide-${i}`}>
              <CarouselContent>{child}</CarouselContent>
            </CarouselSlide>
          ))}
        </CarouselContainer>
      </CarouselViewport>
    </RootContainer>
  );
}

const RootContainer = styled.div<{ $slideSize: number; $slideSpacing: string; $slideHeight: string }>`
  --slide-size: ${({ $slideSize }) => `${$slideSize}px`};
  --slide-spacing: ${({ $slideSpacing }) => $slideSpacing};
  --slide-height: ${({ $slideHeight }) => $slideHeight};

  max-width: 425px;
`;

const CarouselViewport = styled.div`
  overflow: hidden;
`;

const CarouselContainer = styled.div`
  display: flex;
  touch-action: pan-y pinch-zoom;
  margin-left: calc(var(--slide-spacing) * -1);
  /* Set initial position via JS in an effect for robustness */
  transform: translate3d(${(425 - SLIDE_SIZE) / 2}px, 0px, 0px);
`;

const CarouselSlide = styled.div`
  flex: 0 0 var(--slide-size);
  min-width: 0px;
  padding-left: var(--slide-spacing);
`;

const CarouselContent = styled.div`
  background: oklch(99.88% 0.0147 294.47);
  border: 2px solid oklch(76.64% 0.1304 292.01 / 52.47%);
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  user-select: none;
`;
