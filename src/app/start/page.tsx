"use client";

import React from "react";
import styled from "styled-components";
import Device from "@/components/Device";
import LoginForm from "@/components/LoginForm";
import AccountCard from "@/components/AccountCard";
import useToggle from "@/hooks/use-toggle";

const RootWrapper = styled.div`
  height: 100%;
  display: grid;
  place-content: center;
`;

function StartPage() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [trigger, setTrigger] = useToggle(false);

  return (
    <>
      <RootWrapper>
        <div
          style={{
            width: "376px",
            height: "779px",
            container: "demo-frame / size",
          }}
          ref={rootRef}
        >
          <AccountCard trigger={trigger} rootRef={rootRef} />
        </div>
        {/* <Device main={<LoginForm />} /> */}
        {/* <Device header={<h1>Account Card</h1>} main={<AccountCard />} /> */}
      </RootWrapper>
      <button
        style={{
          border: "1px solid black",
          width: "100px",
          height: "50px",
        }}
        onClick={setTrigger}
      >
        클릭
      </button>
    </>
  );
}

export default StartPage;
