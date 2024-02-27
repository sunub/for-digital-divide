"use client";

import React from "react";
import Id from "@/components/LoginForm/LoginInput/Id";
import { fidoUsernameActon } from "@lib/fido/username/action";
import FidoForm from "@/components/FidoForm";
import { redirect } from "next/navigation";
import { decode } from "js-base64";
import { createCredentials } from "@/lib/credentials";
import Username from "@/components/LoginForm/LoginInput/Username";

function Page() {
  return (
    <FidoForm
      key={"fido-login_username"}
      type="username"
      redirect={() => redirect("/login/password")}
      action={async (formData) => {
        await fidoUsernameActon(formData);
      }}
      // await createCredentials();
    >
      <Username />
      {/* <Id minLength={1} maxLength={20} /> */}
    </FidoForm>
  );
}

export default Page;
