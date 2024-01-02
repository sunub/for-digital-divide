import React from "react";
import * as Styled from "./Header.style";
import SmallPhone from "../SmallPhone";

function Header() {
  return (
    <Styled.RootWrapper>
      <Styled.IconWrapper>
        <Arrow />
        <Help />
      </Styled.IconWrapper>
    </Styled.RootWrapper>
  );
}

function Arrow() {
  return (
    <Styled.Button>
      <svg
        width="32"
        height="30"
        viewBox="0 0 32 30"
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
    </Styled.Button>
  );
}

function Help() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="16" fill="#544C4C" />
      <path
        d="M11 11.78C11.3867 10.6333 12.04 9.72 12.96 9.04C13.88 8.34667 15.0133 8 16.36 8C17.2533 8 18.1 8.18667 18.9 8.56C19.7133 8.93333 20.3667 9.47333 20.86 10.18C21.3533 10.8733 21.6 11.6867 21.6 12.62C21.6 13.7133 21.3267 14.6267 20.78 15.36C20.2467 16.0933 19.4467 16.7267 18.38 17.26C17.7933 17.5667 17.3933 17.8467 17.18 18.1C16.98 18.34 16.8733 18.6667 16.86 19.08L16.84 19.98H14.44L14.42 18.82C14.4067 18.2467 14.4667 17.7667 14.6 17.38C14.7467 16.9933 14.9933 16.6467 15.34 16.34C15.7 16.0333 16.2067 15.72 16.86 15.4C17.62 15 18.1667 14.5933 18.5 14.18C18.8467 13.7667 19.02 13.2467 19.02 12.62C19.02 11.9133 18.7667 11.36 18.26 10.96C17.7533 10.5467 17.12 10.34 16.36 10.34C15.5733 10.34 14.9533 10.5267 14.5 10.9C14.0467 11.2733 13.6733 11.8333 13.38 12.58L11 11.78ZM15.66 25.42C15.2067 25.42 14.82 25.26 14.5 24.94C14.18 24.6333 14.02 24.2533 14.02 23.8C14.02 23.3467 14.18 22.96 14.5 22.64C14.82 22.32 15.2067 22.16 15.66 22.16C16.1133 22.16 16.4933 22.32 16.8 22.64C17.12 22.96 17.28 23.3467 17.28 23.8C17.28 24.2533 17.12 24.6333 16.8 24.94C16.4933 25.26 16.1133 25.42 15.66 25.42Z"
        fill="#F5F3FE"
      />
    </svg>
  );
}

export default Header;
