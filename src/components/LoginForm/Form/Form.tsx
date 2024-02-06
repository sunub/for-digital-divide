"use client";

import React from "react";
import * as Styled from "./Form.styled";
import LoginInput from "../LoginInput";

function Form({
  dispatch,
  children,
}: {
  dispatch: React.Dispatch<LoginAction>;
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <Styled.MainWrapper>
        <LoginInput />
        {children}
        {/* {portalRef.current &&
            createPortal(
              <InvalidMessage message={errorMessage.message} />,
              portalRef.current as HTMLDivElement
            )} */}
      </Styled.MainWrapper>
      <Styled.FooterWrapper></Styled.FooterWrapper>
    </React.Fragment>
  );
}

export default Form;

{
  /* <div id="login-form__warning-portal" ref={portalRef} />
<InvalidMessage message={errorMessage.message} />
{isPending ? <div>loading...</div> : null} */
}
