import React from "react";
import { Page } from "./page.style";
import LoginForm from "@compo/LoginForm";
import Device from "@/components/Device";
import ResizeFont from "@/components/ResizeFont/ResizeFont";

function LoginPage() {
  return (
    <>
      <Page>
        <Device>
          <LoginForm />
        </Device>
      </Page>
      <ResizeFont />
    </>
  );
}

export default LoginPage;
