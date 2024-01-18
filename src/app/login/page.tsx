"use client";

import React from "react";
import { Page } from "./page.style";
import LoginForm from "@compo/LoginForm";
import Device from "@/components/Device";
import ResizeFont from "@/components/ResizeFont/ResizeFont";
import { revalidatePath } from "next/cache";

function LoginPage() {
  return (
    <>
      <Page>
        <Device>
          <LoginForm />
        </Device>
        <button onClick={() => revalidatePath("/dashboard", "page")}>go</button>
      </Page>
    </>
  );
}

export default LoginPage;
