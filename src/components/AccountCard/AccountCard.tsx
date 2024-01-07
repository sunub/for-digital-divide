"use client";

import React from "react";
import * as Styled from "./AccountCard.style";
import useToggle from "@/hooks/use-toggle";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AccountCardHelper from "./AccountCard.helper";

function AccountCard({ trigger }: { trigger: boolean }) {
  const draggableRef = React.useRef<HTMLDivElement>(null);
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

  React.useEffect(() => {
    gsap.registerPlugin(Draggable, ScrollTrigger);
    Draggable.create(draggableRef.current, {
      type: "x",
      trigger: ".card-items-wrapper",
      bounds: ".root-items-wrapper",
      onDragEnd() {
        gsap.to(this.target, { x: 0, duration: 0 });
      },
    });

    const trigger = ScrollTrigger.create({
      start: 0,
      onUpdate(self) {
        console.log(self);
      },
    });

    const snapTime = gsap.utils.snap(0.1);
    // console.log(snapTime);
    function scrollToOffset(offset) {
      // 새로운 snap 값을 할당한다.
      let snappedTime = snapTime(offset);
      let progress = snappedTime;
    }
  }, [trigger]);

  return (
    <Styled.Wrapper className="root-items-wrapper">
      <Styled.CardWrapper className="card-items-wrapper">
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
        ref={draggableRef}
        className="drag-proxy"
        style={{
          backgroundColor: "red",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          position: "absolute",
          left: "calc(50cqw - 25px)",
        }}
      />
    </Styled.Wrapper>
  );
}

export default AccountCard;
