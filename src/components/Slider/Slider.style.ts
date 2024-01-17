"use client";

import styled from "styled-components";

export const RangeWrapper = styled.div`
  /* grid-area: resize-font-slider / main; */
  position: relative;
  display: grid;
  width: 30cqw;
`;

export const SliderOutput = styled.span<{
  $position: number;
  $isHover: boolean;
}>`
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

export const RangeSlider = styled.input<{
  $trackFill: number;
  $hovering: number;
}>`
  &[type="range"] {
    appearance: none;
    background: transparent;
    outline-offset: 4px;
    width: 100%;

    &::-webkit-slider-runnable-track {
      appearance: none;
      height: 0.5cqh;
      border-radius: 5px;
      background: linear-gradient(
          to right,
          transparent ${({ $trackFill }) => $trackFill}%,
          oklch(82.08% 0.051 302.57) 0%
        ),
        var(--color-button) fixed;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      cursor: grab;
      width: 3cqh;
      height: 3cqh;
      border: 3px solid var(--color-primary);
      background: var(--color-button) fixed;
      border-radius: 50%;
      aspect-ratio: 1 / 1;
      transition: box-shadow 200ms cubic-bezier(0.17, 0.67, 0.27, 0.86);
      margin-top: calc(-3cqh / 2 + 0.5cqh / 2);

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
