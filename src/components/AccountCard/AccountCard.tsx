"use client";

import React from "react";
import * as Styled from "./AccountCard.style";
import useToggle from "@/hooks/use-toggle";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import AccountCardHelper from "./AccountCard.helper";

let iteration = 3;
const RANGE = [531, 907];
const DISTANCE = 105;

function AccountCard({ pagetrigger }: { pagetrigger: boolean }) {
  const middleRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    middleRef.current?.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, []);

  return (
    <>
      <Styled.RootWrapper id="account-card-list">
        <Styled.Wrapper className="card-list">
          <Styled.CardWrapper className="cards">
            <Styled.Card data-order={1}>1</Styled.Card>
            <Styled.Card data-order={2} ref={middleRef}>
              2
            </Styled.Card>
            <Styled.Card data-order={3}>3</Styled.Card>
          </Styled.CardWrapper>
        </Styled.Wrapper>
      </Styled.RootWrapper>
    </>
  );
}

export default AccountCard;
