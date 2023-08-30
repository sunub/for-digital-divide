"use client"

import React, { ForwardedRef, useEffect } from "react"
import styled from "styled-components"
import SearchIcon from "./SearchIcon"

const Dialog = styled.dialog`
    position: fixed;
    inset: 0;

    display: grid;
    margin: auto;

    &[open] {
        color: white;
        background-color: black;
        border: none;

        opacity: 1;
        visibility: visible;
    }

    &:not([open]) {
        opacity: 0;
        visibility: hidden;
    }
`

const Form = styled.form`
    
`

const Input = styled.input`
    
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
                <fieldset>
                    <label
                        htmlFor="search-bar__input"
                    >
                        검색창
                    </label>
                    <Input
                        id="search-bar__input"
                        name="search-bar__input"
                        type="text"
                        minLength={1}
                        maxLength={100}
                        placeholder="검색할 내용을 입력하세요"
                        required
                    />
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
                        />
                    </button>
                </fieldset>
            </Form>
            <div>
                HI!
            </div>
        </Dialog>
    )
}))

SearchBar.displayName = "Search Bar"

export default SearchBar