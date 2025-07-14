'use client';

import styled from 'styled-components';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useSelectedSnapDisplay } from '../hooks/useSelectedSnapDisplay';
import { FlexDiv } from '@/shared/style/component/div';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function Carousel({ options, children }: { options?: EmblaOptionsType; children: React.ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      const params = new URLSearchParams(searchParams.toString());
      const selectedIndex = emblaApi.selectedScrollSnap();
      params.set('accountIndex', String(selectedIndex));
      router.replace(`${pathname}?${params.toString()}`);
    };
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <Section>
      <Viewport ref={emblaRef}>
        <Container>
          {React.Children.map(children, (child, index) => (
            <Slide key={index}>{child}</Slide>
          ))}
        </Container>
      </Viewport>
      <SelectedSnapDisplay>
        <PrevButton onClick={() => emblaApi?.scrollPrev()}>
          <ChevronLeftIcon size={32} />
        </PrevButton>
        <p>
          {selectedSnap + 1} / {snapCount}
        </p>
        <NextButton onClick={() => emblaApi?.scrollNext()}>
          <ChevronRightIcon size={32} />
        </NextButton>
      </SelectedSnapDisplay>
    </Section>
  );
}

const SelectedSnapDisplay = styled(FlexDiv)`
  padding-left: 1rem;
  gap: 0.5rem;
  justify-content: flex-start;
`;

const PrevButton = styled.button``;

const NextButton = styled.button``;

const Section = styled.section`
  --slide-height: 19rem;
  --slide-spacing: 2rem;
  --slide-size: 100cqw;
  --slide-max-width: 100cqw;

  color: var(--color-accent);
  max-width: var(--slide-max-width);
`;

const Viewport = styled.div`
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  touch-action: pan-y pinch-zoom;
  margin-left: calc(var(--slide-spacing) * -1);
  padding-bottom: 1rem;
  padding-top: 1rem;
`;

const Slide = styled.div`
  transform: translate3d(0, 0, 0);
  flex: 0 0 var(--slide-size);
  min-width: 0;
  padding-left: var(--slide-spacing);
`;

// const SlideNumber = styled.div`
//   box-shadow: inset 0 0 0 0.2rem oklch(21.25% 0.005 17.53);
//   border-radius: 1.8rem;
//   font-size: 4rem;
//   font-weight: 600;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: var(--slide-height);
//   user-select: none;
// `;
