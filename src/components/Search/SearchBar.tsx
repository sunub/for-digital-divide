"use client"

import React, { ForwardedRef, useEffect } from "react"
import styled from "styled-components"
import SearchIcon from "./SearchIcon"

const Dialog = styled.dialog`
    position: absolute;
    left: 50%;
    inset: 0;

    margin: auto;
    width: 706px;
    
    border: none;
    background-color: transparent;
    &[open] {
        border: none;

        opacity: 1;
        visibility: visible;
    }

    &::backdrop {
        backdrop-filter: blur(8px);
    }

    &:not([open]) {
        opacity: 0;
        visibility: hidden;
    }
`

const SearchInputField = styled.fieldset`
    display: flex;
    flex-direction: row;
    border: none;
    background-color: oklch(98.64% 0.027 251);
    padding: 0;
`

const SearchBox = styled.div`
    width: 480px;
`

const Input = styled.input`
    width: 100%;
    height: 58px;

    position: relative;
    outline: 0;
    font-size: 1.5rem;
    font-weight: bold;

    line-height: calc(1.7rem);
`

interface DialogProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchBar = React.forwardRef((({ setOpen }: DialogProps, ref: ForwardedRef<HTMLDialogElement>) => {
    const [isSend, setStatus] = React.useState(false);

    useEffect(() => {
    }, [isSend])

    return (
        <Dialog id="search-bar__dialog" ref={ref} >
            <form method="dialog" >
                <SearchInputField>
                    <SearchBox>
                        <Input
                            id="search-bar__input"
                            name="search-bar__input"
                            type="search"
                            maxLength={100}
                            autoComplete="off"
                            placeholder="검색어를 입력해 주세요"
                            required
                        />
                    </SearchBox>
                    <button
                        onClick={() => {
                            setStatus(!isSend);
                        }}
                    >
                        <SearchIcon
                            colors={{
                                background: "white",
                                fill: "black"
                            }}
                            click={{
                                status: isSend,
                                setter: setStatus
                            }}
                            size={{
                                width: 30,
                                height: 30,
                            }}
                        />
                    </button>
                </SearchInputField>
            </form>
        </Dialog>
    )
}))

SearchBar.displayName = "Search Bar"

export default SearchBar