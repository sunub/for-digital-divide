"use client"

import React, { useState } from "react";
import SearchIcon from "./SearchIcon";
import { styled } from "styled-components";
import SearchBar from "./SearchBar";

const Container = styled.div`
    `

export default function Search() {
    const [isOpen, setOpen] = useState(false);
    const searchBarRef = React.useRef<HTMLDialogElement>(null)

    React.useEffect(() => {
        if (isOpen && searchBarRef) {
            const dialog = searchBarRef.current;
            dialog?.showModal();
        }
    }, [isOpen])

    const colors = {
        background: "black",
        fill: "white"
    }

    return (
        <Container>
            <SearchIcon
                colors={colors}
                click={{
                    status: isOpen,
                    setter: setOpen
                }} />
            <SearchBar ref={searchBarRef} setOpen={setOpen} />
        </Container>
    )
}