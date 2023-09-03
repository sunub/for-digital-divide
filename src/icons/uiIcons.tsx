import { CSSProperties } from "react"

function SearchIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
}

function NavigateBefore() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M561.435-209.695 290.13-480.435 561.435-751.74l85.87 85.87L461.87-480.435l185.435 184.87-85.87 85.87Z" />
        </svg>
    )
}

function KeyboardIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-200q-33 0-56.5-23.5T80-280v-400q0-33 23.5-56.5T160-760h640q33 0 56.5 23.5T880-680v400q0 33-23.5 56.5T800-200H160Zm0-80h640v-400H160v400Zm160-40h320v-80H320v80ZM200-440h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80ZM200-560h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80ZM160-280v-400 400Z" /></svg>
    )
}

function PhoneFrame() {
    return (
        <svg
            width="376"
            height="779"
            viewBox="0 0 376 779"
            fill={"none"}
            xmlns="http://www.w3.org/2000/svg">
            <path id="OuterFrame" d="M0 44C0 19.6995 19.6995 0 44 0H332C356.301 0 376 19.6995 376 44V735C376 759.301 356.301 779 332 779H44C19.6995 779 0 759.301 0 735V44Z" fill={"#D9D9D9"} />
            <path id="InnerShadow" d="M9.15881 46.9407C9.19153 26.5294 25.7474 10 46.1588 10H330.689C351.146 10 367.721 26.6016 367.689 47.0593L366.589 733.025C366.557 753.437 350.001 769.966 329.589 769.966H45.0593C24.6016 769.966 8.02661 753.364 8.0594 732.907L9.15881 46.9407Z" fill={"#7D7D7D"} />
            <path id="InnerFrame" d="M15 51C15 31.1177 31.1178 15 51 15H325.342C345.224 15 361.342 31.1178 361.342 51V732.672C361.342 749.793 347.463 763.672 330.342 763.672H46C28.8792 763.672 15 749.793 15 732.672V51Z" fill={"white"} />
        </svg>
    )
}

export { SearchIcon, NavigateBefore, KeyboardIcon, PhoneFrame }