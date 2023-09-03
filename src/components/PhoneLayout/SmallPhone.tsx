"use client"

import React, { CSSProperties } from "react"
import styled from "styled-components"
import * as Icons from "@/icons/index"

const OuterPhoneFrame = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 80px;
    height: 15%;

    background-color: oklch(91.29% 0 200);
    border-radius: 25px 25px 25px 25px;
    border: none;
    
    padding: 6px;
`
const Shadow = styled.div`
    position: relative;

    width: 80px;
    height: 150px;

    background-color: oklch(91.29% 0 200);
    border-radius: 25px 25px 25px 25px;
    border: none;
    
    transform: rotate3d(5, 1, 1, -75deg) scaleX(1.1);
`
// const Frame = styled.div`
//     position: absolute;
//     left: 0;
//     top: 0;

//     width: 80px;
//     height: 150px;

//     background-color: oklch(73.6% 0 200);
//     border-radius: 25px 25px 25px 25px;
//     border: none;

//     padding: 6px;
//     transform: rotateX(30deg) translate3d(12px, 1rem, -20rem);
// `

const InnerPhoneFrame = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    
    background-color: oklch(97.17% 0 200);
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

const SVGStyle: CSSProperties = {
    gridArea: "phone",
    transform: "scale(0.2) rotate3d(6, 1, 1, -80deg)",
}

// const Container = styled.div`
//     display: grid;
//     position: relative;

//     grid: [phone] 100px / [phone] 100px;
// `

const IconP = styled.div<{ $transfrom: string }>`
    grid-area: phone;
    transform: ${(props) => props.$transfrom};
    filter: drop-shadow(-30px 80px 1px #7D7D7D);
`

const Container = styled.div`
    --background-color: oklch(27.95% 0.037 260.03);

    background: var(--background-color);
    padding: .3rem;
    box-shadow: inset 1rem 1rem 0 0.4rem oklch(71.07% 0.035 256.79);

    transform: rotateX(60deg) rotateZ(45deg) scale(.2);
    border-radius: 4rem;

    display: flex;
    gap: 0 2rem;
`

const Frame = styled.div`
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;

    background: transparent;
    border-radius: 4rem;
    box-shadow: 
        inset -0.3rem -0.3rem 0.1rem 0.2rem oklch(84.3% 0.031 247.9),
        inset -1rem -1rem 0 0.4rem oklch(96.83% 0.007 247.9),
        3rem 3rem 3px 0rem oklch(96.83% 0.007 247.9);
`

const Icon = styled.div`
    transform: translateX(-4px);
`

export default function SmallPhone() {
    return (<>
        <Container>
            <Frame />
            <Icon>
                <Icons.PhoneFrame />
            </Icon>
        </Container>
    </>)
}

// layered_shadow(25, 0.3, 0.3, $color-gray-200),
// @function layered_shadow($layers, $gap_x, $gap_y, $color) {
//     $value: 0 0 $color;
//     @for $i from 1 through $layers {
//       $value: #{$value}, #{$i * $gap_x}rem #{$i * $gap_y}rem #{$color};
//     }
//     @return $value;
//   }