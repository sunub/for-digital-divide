import { CSSProperties } from 'react';

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}

function NavigateBefore() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path d="M561.435-209.695 290.13-480.435 561.435-751.74l85.87 85.87L461.87-480.435l185.435 184.87-85.87 85.87Z" />
    </svg>
  );
}

function KeyboardIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path d="M160-200q-33 0-56.5-23.5T80-280v-400q0-33 23.5-56.5T160-760h640q33 0 56.5 23.5T880-680v400q0 33-23.5 56.5T800-200H160Zm0-80h640v-400H160v400Zm160-40h320v-80H320v80ZM200-440h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80ZM200-560h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80Zm120 0h80v-80h-80v80ZM160-280v-400 400Z" />
    </svg>
  );
}

function PhoneFrame() {
  return (
    <svg
      width="376"
      height="779"
      viewBox="0 0 376 779"
      fill={'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="OuterFrame"
        d="M0 44C0 19.6995 19.6995 0 44 0H332C356.301 0 376 19.6995 376 44V735C376 759.301 356.301 779 332 779H44C19.6995 779 0 759.301 0 735V44Z"
        fill={'#D9D9D9'}
      />
      <path
        id="InnerShadow"
        d="M9.15881 46.9407C9.19153 26.5294 25.7474 10 46.1588 10H330.689C351.146 10 367.721 26.6016 367.689 47.0593L366.589 733.025C366.557 753.437 350.001 769.966 329.589 769.966H45.0593C24.6016 769.966 8.02661 753.364 8.0594 732.907L9.15881 46.9407Z"
        fill={'oklch(58.97% 0 0)'}
      />
      <path
        id="InnerFrame"
        d="M15 51C15 31.1177 31.1178 15 51 15H325.342C345.224 15 361.342 31.1178 361.342 51V732.672C361.342 749.793 347.463 763.672 330.342 763.672H46C28.8792 763.672 15 749.793 15 732.672V51Z"
        fill={'white'}
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="27"
      height="25"
      viewBox="0 0 27 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.583343 10.8835C-0.194445 11.664 -0.194448 12.9266 0.583335 13.7071L11.0424 24.2025C11.9395 25.1027 13.4632 24.3184 13.2518 23.0652C12.9161 21.0748 12.6742 19.0726 12.5259 17.0653C12.5305 17.0636 12.5351 17.0618 12.5396 17.06L25.3624 14.5892L25.3655 14.5892C25.8704 14.5892 26.2798 13.6361 26.2798 12.4604C26.2798 11.2847 25.8704 10.3316 25.3655 10.3316L25.3655 10.331L12.5383 7.85928C12.5266 7.85471 12.5148 7.85032 12.5031 7.84612C12.6487 5.73131 12.8983 3.62187 13.2518 1.5255C13.4632 0.272239 11.9396 -0.512027 11.0424 0.388229L0.583343 10.8835Z"
        fill="#544C4C"
      />
    </svg>
  );
}
export { SearchIcon, NavigateBefore, KeyboardIcon, PhoneFrame, ArrowIcon };
