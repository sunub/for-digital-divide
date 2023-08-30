"use client"

import React from "react"
import styled from "styled-components"
import NavigationBar from "./NavigationBar"

const OuterPhoneFrame = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 390px;
    height: 100%;

    background-color: oklch(65.95% 0.145 244.91);
    border-radius: 100px 100px 68px 68px;
    border: none;
    
    padding: 16px;
`

const InnerPhoneFrame = styled.div`
    width: 360px;
    height: 100%;
    position: relative;
    
    mix-blend-mode: lighten;
    background-color: oklch(75.52% 0.111 236.79);
    border-radius: 88px 88px 48px 48px;

    display: flex;
    align-items: center;
    justify-content: center;
`

export default function PhoneShape({ children }: { children: React.ReactNode }) {
    return (
        <OuterPhoneFrame>
            <InnerPhoneFrame>
                {children}
                <NavigationBar />
            </InnerPhoneFrame>
        </OuterPhoneFrame>
    )
}