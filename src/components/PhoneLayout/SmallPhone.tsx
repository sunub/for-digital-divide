"use client"

import React from "react"
import styled from "styled-components"
import * as Icons from "@/icons/index"

const OuterPhoneFrame = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 80px;
    height: 15%;

    background-color: oklch(65.95% 0.145 244.91);
    border-radius: 25px 25px 25px 25px;
    border: none;
    
    padding: 6px;
`

const InnerPhoneFrame = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    
    background-color: oklch(75.52% 0.111 236.79);
    border-radius: 25px 25px 25px 25px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const CameraCircle = styled.div`
    width: 15px;
    height: 15px;

    border-radius: 50%;
    aspect-ratio: 1 / 1;
    background-color: black;
`


export default function SmallPhone() {
    return (
        <OuterPhoneFrame>
            <InnerPhoneFrame>
                <CameraCircle />
                <Icons.SearchIcon />
            </InnerPhoneFrame>
        </OuterPhoneFrame>
    )
}