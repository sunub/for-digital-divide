"use client";

import React from "react";
import * as Styled from "./AccountCard.style";
import useToggle from "@/hooks/use-toggle";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AccountCardHelper from "./AccountCard.helper";

const POSITIONS = [];
let iteration = 0;

function AccountCard({
  rootRef,
  trigger,
}: {
  rootRef: React.RefObject<HTMLDivElement>;
  trigger: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isMoving, toggleIsMoving] = useToggle(false);
  const [startOffset, setStartOffset] = React.useState<number>(0);
  const [accountBuffer, setAccountBuffer] = React.useState<any[]>([
    {
      name: "1",
      accountNumber: "426402-02-133421",
      price: "216,9180원",
      // ref: React.useRef<HTMLDivElement>(null),
    },
    {
      name: "2",
      accountNumber: "426402-02-133421",
      price: "216,9180원",
      // ref: React.useRef<HTMLDivElement>(null),
    },
    {
      name: "3",
      accountNumber: "426402-02-133421",
      price: "216,9180원",
      // ref: React.useRef<HTMLDivElement>(null),
    },
  ]);

  React.useEffect(() => {}, []);

  React.useEffect(() => {
    if (rootRef.current) {
      const root = rootRef.current;
      const rootRect = root.getBoundingClientRect();
      const rootCenter = Math.floor(rootRect.width / 2);
    }
  }, [rootRef]);

  return (
    <Styled.Wrapper className="root-items-wrapper">
      <Styled.CardWrapper ref={ref} className="card-items-wrapper">
        {accountBuffer.map((account, i) => (
          <Styled.Card
            className="card-items"
            key={`${i}th-account-card`}
            ref={account.ref}
          >
            <header>
              <h3>{account.name}</h3>
              <span>{account.accountNumber}</span>
            </header>
            <main>{account.price}</main>
            <button>입금</button>
          </Styled.Card>
        ))}
      </Styled.CardWrapper>
      <div
        className="drag-proxy"
        style={{
          backgroundColor: "red",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
        }}
      >
        a
      </div>
    </Styled.Wrapper>
  );
}

export default AccountCard;
