"use client";

import styled from "styled-components";
import Device from "@/components/Device";
import LoginForm from "@/components/LoginForm";

const RootWrapper = styled.div`
  height: 100%;
  display: grid;
  place-content: center;
`;

function StartPage() {
  return (
    <>
      <RootWrapper>
        <Device main={<LoginForm />} />
      </RootWrapper>
    </>
  );
}

export default StartPage;
