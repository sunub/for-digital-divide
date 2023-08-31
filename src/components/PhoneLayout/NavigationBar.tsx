"use client"

import React from "react"
import styled from "styled-components"
import * as Icons from "@/icons/index"

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;

    width: 100%;
    height: 48px;
    position: absolute;
    bottom: 0;

    background: color-mix(in oklch, oklch(96.29% 0 236.79), oklch(95.99% 0.128 236.79));
    border-radius: 0px 0px 68px 68px;
`

const Icon = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    left: -7.5px;
    width: 48px;
    height: 48px;
    padding: 4px;

    border-radius: 50%;
    aspect-ratio: 1 / 1;
    border: none;
    
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    border: none;
    
    & > svg {
        width: 100%;
        height: 100%;
    }
`

export default function NavigationBar() {
    return (
        <Container>
            <div />
            <div />
            <Icon>
                <Icons.NavigateBefore />
            </Icon>
        </Container>
    )
}