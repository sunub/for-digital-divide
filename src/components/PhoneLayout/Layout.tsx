"use client"

import React from "react"
import PhoneShape from "./PhoneShape"
import Spacer from "@/constants/Spacer"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (<>
        <Spacer axis="vertical" size={16} />
        {children}
        <Spacer axis="vertical" size={16} />
    </>)
}