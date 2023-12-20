"use client";

import React from "react";
import styled from "styled-components";

type Axis = "horizontal" | "vertical";

function getWidthByDirection(axis: Axis, size: number) {
  return axis === "horizontal" && size ? size : 1;
}

function getHeightByDirection(axis: Axis, size: number) {
  return axis === "vertical" && size ? size : 1;
}

const SpacerSpan = styled.span<{
  $axis: Axis;
  $width: number;
  $height: number;
}>`
  display: block;
  width: ${({ $axis, $width }) => getWidthByDirection($axis, $width)}px;
  height: ${({ $axis, $height }) => getHeightByDirection($axis, $height)}px;
`;

function Spacer({ axis, size }: { axis: Axis; size: number }) {
  const width = getWidthByDirection(axis, size);
  const height = getHeightByDirection(axis, size);

  return <SpacerSpan $axis={axis} $width={width} $height={height} />;
}

export default Spacer;
