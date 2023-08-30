"use client"

import React from "react"
import styled from "styled-components"
import * as Icons from "@/icons/index"

const Container = styled.div`
    display: grid;

    width: 100%;
    height: 48px;
    position: absolute;
    bottom: 0;

    background: color-mix(in oklch, oklch(96.29% 0 236.79), oklch(95.99% 0.128 236.79));
    border-radius: 0px 0px 68px 68px;
`

const Icon = styled.button`
    background: white;

    display: flex;
    justify-content: center;

    height: 100%;
`

export default function NavigationBar() {
    return (
        <Container>
            <Icon>
                <Icons.NavigateBefore />
            </Icon>
        </Container>
    )
}