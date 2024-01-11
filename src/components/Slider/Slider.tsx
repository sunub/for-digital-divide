"use client";

import useToggle from "@/hooks/use-toggle";
import React from "react";
import styled from "styled-components";

const RangeWrapper = styled.div`
  grid-area: resize-font-slider / main;
  position: relative;
  display: grid;
`;

const SliderOutput = styled.span<{ $position: number; $isHover: boolean }>`
  position: absolute;
  user-select: none;
  pointer-events: none;
  color: var(--color-primary);
  background-color: var(--color-button);
  border-radius: 9px;
  opacity: ${({ $isHover }) => ($isHover ? 1 : 0.5)};
  visibility: ${({ $isHover }) => ($isHover ? "visible" : "hidden")};

  font-size: 12px;
  font-weight: 700;
  padding: 1px 8px;
  line-height: 28px;

  position: absolute;
  top: -54px;
  left: ${({ $position }) =>
    `calc(${$position}% + (${-8 - $position * 0.26}px))`};

  &::before {
    content: "";
    position: absolute;
    top: 28px;
    left: calc(50% - 5px);

    width: 0;
    height: 0;

    border-top: 10px solid var(--color-button);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
`;

const RangeSlider = styled.input<{ $trackFill: number; $hovering: number }>`
  &[type="range"] {
    appearance: none;
    background: transparent;
    outline-offset: 4px;
    width: 100%;

    &::-webkit-slider-runnable-track {
      appearance: none;
      height: 3px;
      border-radius: 5px;
      background: linear-gradient(
          to right,
          transparent ${({ $trackFill }) => $trackFill}%,
          oklch(72.81% 0.051 302.57) 0%
        ),
        var(--color-button) fixed;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      cursor: grab;
      width: 24px;
      height: 24px;
      border: 3px solid var(--color-primary);
      background: var(--color-button) fixed;
      border-radius: 50%;
      aspect-ratio: 1 / 1;
      transition: box-shadow 200ms cubic-bezier(0.17, 0.67, 0.27, 0.86);
      margin-top: -11px;

      &:active {
        cursor: grabbing;
      }

      &:hover {
        box-shadow: 0 0 0 ${({ $hovering }) => $hovering}px
          color-mix(in oklch, var(--color-button), transparent);
      }
    }
  }
`;
interface SliderProps {
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
}

function Slider(props: SliderProps) {
  const { fontSize, setFontSize } = props;
  const min = 16;
  const max = 64;
  const [hovering, toggleHovering] = useToggle(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const [percent, setPercent] = React.useState(() => {
    const percent = ((fontSize - min) * 100) / (max - min);
    return Math.floor(percent);
  });
  const [position, setPosition] = React.useState<number>(27.5);

  React.useEffect(() => {
    setPercent(() => {
      const percent = ((fontSize - min) * 100) / (max - min);
      return Math.round(percent);
    });
  }, [fontSize]);
  // 64.5 46.5 27.5 8.5 -8.5

  return (
    <RangeWrapper ref={ref}>
      <RangeSlider
        id="start_page--text-size"
        type="range"
        min={min}
        max={max}
        step={4}
        value={fontSize}
        $trackFill={percent}
        $hovering={hovering ? 12 : 10}
        onChange={(e) => {
          setFontSize(() => Number(e.target.value));
        }}
        onMouseEnter={toggleHovering}
        onMouseOut={toggleHovering}
      />
      <SliderOutput $position={percent} $isHover={hovering}>
        {fontSize}px
      </SliderOutput>
    </RangeWrapper>
  );
}

export default React.memo(Slider);

// const
// 	range = document.getElementById('range'),
// 	rangeV = document.getElementById('rangeV'),
// 	setValue = ()=>{
// 		const
// 			newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) ),
// 			newPosition = 10 - (newValue * 0.2);
// 		rangeV.innerHTML = `<span>${range.value}</span>`;
// 		rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
// 	};
// document.addEventListener("DOMContentLoaded", setValue);
// range.addEventListener('input', setValue);

// const allRanges = document.querySelectorAll(".range-wrap");
// allRanges.forEach(wrap => {
//   const range = wrap.querySelector(".range");
//   const bubble = wrap.querySelector(".bubble");

//   range.addEventListener("input", () => {
//     setBubble(range, bubble);
//   });
//   setBubble(range, bubble);
// });

// function setBubble(range, bubble) {
//   const val = range.value;
//   const min = range.min ? range.min : 0;
//   const max = range.max ? range.max : 100;
//   const newVal = Number(((val - min) * 100) / (max - min));
//   bubble.innerHTML = val;

//   // Sorta magic numbers based on size of the native UI thumb
//   bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
// }
