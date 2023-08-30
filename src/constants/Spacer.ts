"use client";

import styled from "styled-components";

interface SpacerProps {
	axis: string;
	size: number;
}

function getWidth({ axis, size }: SpacerProps): number {
	return axis === "vertical" ? 1 : size;
}

function getHeight({ axis, size }: SpacerProps): number {
	return axis === "horizontal" ? 1 : size;
}

const Spacer = styled.span<SpacerProps>`
	display: block;
	width: ${getWidth}px;
	min-width: ${getWidth}px;
	height: ${getHeight}px;
	min-height: ${getHeight}px;
`;

export default Spacer;
