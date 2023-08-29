"use client"

import React, { useState } from "react";
import { SearchIcon } from "@/app/icons/index";
import { styled } from "styled-components";
import SearchBar from "./SearchBar";

const Container = styled.div`
    `

const Icon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;

    background-color: black;
    border: black solid 1px;
    border-radius: 50%;
    aspect-ratio: 1 / 1;

    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    outline-offset: 4px;
    :focus:not(:focus-visible) {
        outline: none;
    }
`

export default function Search() {
    const [isOpen, setOpen] = useState(false);
    const searchBarRef = React.useRef<HTMLDialogElement>(null)

    React.useEffect(() => {
        console.log(searchBarRef)
        if (isOpen && searchBarRef) {
            const dialog = searchBarRef.current;

            dialog?.showModal();
        }
    }, [isOpen])

    return (
        <Container>
            <Icon
                onClick={() => setOpen(!isOpen)}
            >
                <SearchIcon />
            </Icon>
            <SearchBar ref={searchBarRef} setOpen={setOpen} />
        </Container>
    )
}