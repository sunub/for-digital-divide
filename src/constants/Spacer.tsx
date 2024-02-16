"use client";

import React from "react";
import styled from "styled-components";

type DIR = "horizontal" | "vertical";

const SpacerSpan = styled.span<{ $width: number; $height: number }>`
  display: block;
  width: ${(props) => props.$width}px;
  min-width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
  min-height: ${(props) => props.$height}px;
`;
function getWidth(axis: DIR, size: number) {
  return axis === "vertical" ? 1 : size;
}
function getHeight(axis: DIR, size: number) {
  return axis === "horizontal" ? 1 : size;
}

export default function Spacer({ axis, size }: { axis: DIR; size: number }) {
  const width = getWidth(axis, size);
  const height = getHeight(axis, size);

  return <SpacerSpan $width={width} $height={height} />;
}
