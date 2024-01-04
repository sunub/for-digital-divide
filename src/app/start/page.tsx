"use client";

import styled from "styled-components";
import Device from "@/components/Device";
import LoginForm from "@/components/LoginForm";
import AccountCard from "@/components/AccountCard";

const RootWrapper = styled.div`
  height: 100%;
  display: grid;
  place-content: center;
`;

function StartPage() {
  return (
    <>
      <RootWrapper>
        {/* <Device main={<LoginForm />} /> */}
        <Device header={<h1>Account Card</h1>} main={<AccountCard />} />
      </RootWrapper>
    </>
  );
}

export default StartPage;
