"use client";

import useToggle from "@/hooks/use-toggle";
import React from "react";
import * as Styled from "./Slider.style";

interface SliderProps {
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
}

function Slider(props: SliderProps) {
  const { fontSize, setFontSize } = props;
  const min = 16;
  const max = 48;
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
    <Styled.RangeWrapper ref={ref}>
      <Styled.RangeSlider
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
      <Styled.SliderOutput $position={percent} $isHover={hovering}>
        {fontSize}px
      </Styled.SliderOutput>
    </Styled.RangeWrapper>
  );
}

export default React.memo(Slider);
