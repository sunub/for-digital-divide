"use client"

import React, { ForwardedRef } from "react"
import styled from "styled-components"

const Dialog = styled.dialog`

    &[open] {
        color: white;
        background-color: black;
        border: none;
    }
`

const Form = styled.form`
    
`

interface DialogProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchBar = React.forwardRef((({ setOpen }: DialogProps, ref: ForwardedRef<HTMLDialogElement>) => {

    return (
        <Dialog id="search-bar__dialog" ref={ref} >
            <Form method="dialog" >
                <h1>HI</h1>
                <button
                    onClick={(e) => {
                        const dialog = document.getElementById("search-bar__dialog") as HTMLDialogElement;

                        setOpen(isOpen => !isOpen)
                        dialog.close();
                    }}>
                    close
                </button>
            </Form>
        </Dialog>
    )
}))

SearchBar.displayName = "Search Bar"

export default SearchBar