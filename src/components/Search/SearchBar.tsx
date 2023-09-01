"use client"

import React, { ForwardedRef, useEffect } from "react"
import styled from "styled-components"
import SearchIcon from "./SearchIcon"

const Dialog = styled.dialog`
    position: absolute;
    left: 50%;
    inset: 0;

    margin: auto;
    width: fit-content;
    
    border: none;
    border-radius: 50px;
    padding: 1rem;
    background-color: oklch(97.76% 0 76);
    &[open] {
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

const Form = styled.form`
    background: none;
`

const SearchInputField = styled.fieldset`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;

    border: none;
    padding: 0;
    padding-left: 1rem;
`

const SearchBox = styled.div`
    width: 480px;
`
const Input = styled.input`
    background: none;
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
            <Form method="dialog" >
                <SearchInputField>
                    <SearchIcon
                        colors={{
                            background: "transparent",
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
                </SearchInputField>
            </Form>
        </Dialog>
    )
}))

SearchBar.displayName = "Search Bar"

export default SearchBar