"use client"

import React from "react";
import styled from "styled-components"
import * as Icons from "@/icons/index"

const Icon = styled.div<{ $background: string, $fill: string }>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;

    background-color: ${(props) => props.$background};
    border: black solid 1px;
    border-radius: 50%;
    aspect-ratio: 1 / 1;

    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    outline-offset: 4px;

    & > svg {
        stroke: ${(props) => props.$fill};
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
}

export default function SearchIcon({ colors, click }: SearchIconProps) {

    return (
        <Icon
            $background={colors.background}
            $fill={colors.fill}
            onClick={() => click.setter(!click.status)}
        >
            <Icons.SearchIcon />
        </Icon>
    )
}
