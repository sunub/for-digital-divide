"use client"

import React from "react";
import styled from "styled-components"
import * as Icons from "@/icons/index"

const Icon = styled.div<{ $background: string, $fill: string, $width: number, $height: number }>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: ${(props) => props.$width}px;
    height: ${(props) => props.$height}px;

    background-color: ${(props) => props.$background};
    border: none;
    border-radius: 50%;
    aspect-ratio: 1 / 1;

    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    outline-offset: 4px;

    & > svg {
        stroke: ${(props) => props.$fill};
        stroke-width: 3px;

        width: 100%;
        height: 100%;

        padding: ${(props) => props.$width === 30 ? "2px" : "1rem"};
    }

    :focus:not(:focus-visible) {
        outline: none;
    }
`

interface SearchIconProps {
    colors: {
        background: string,
        fill: string,
    }
    click: {
        status: boolean,
        setter: React.Dispatch<React.SetStateAction<boolean>>
    }
    size: {
        width: number,
        height: number,
    }
}

export default function SearchIcon({ colors, click, size }: SearchIconProps) {

    return (
        <Icon
            $background={colors.background}
            $fill={colors.fill}
            $width={size.width}
            $height={size.height}
            onClick={() => click.setter(!click.status)}
        >
            <Icons.SearchIcon />
        </Icon>
    )
}
