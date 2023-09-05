"use client"

import React from "react";
import useBoop from "@/hooks/use-boop.hook";
import { animated } from "@react-spring/web";

interface UseBoopConfig {
    x?: number;
    y?: number;
    rotation?: number;
    scale?: number;
    timing?: number;
    springConfig?: {
        tension: number;
        friction: number;
    };
}

function Boop({ children, boopConfig }: { children: React.ReactNode, boopConfig: UseBoopConfig }) {
    const [style, trigger] = useBoop(boopConfig)

    return (
        <animated.span style={style as any} onMouseEnter={trigger} >
            {children}
        </animated.span>
    )
}

export default Boop