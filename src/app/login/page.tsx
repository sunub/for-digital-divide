"use client";

import React from "react";
import Id from "@/components/LoginForm/LoginInput/Id";
import { fidoUsernameActon } from "@lib/fido/username/action";
import FidoForm from "@/components/FidoForm";
import { redirect } from "next/navigation";
import { registerCredential } from "@/lib/client";
import { decode } from "js-base64";
import { createCredentials } from "@/lib/credentials";

function Page() {
  return (
    <FidoForm
      key={"fido-login_username"}
      action={async (formData) => {
        await fidoUsernameActon(formData);
        await createCredentials();
      }}
      // redirect={() => redirect("/login/password")}
    >
      <Id minLength={1} maxLength={20} />
    </FidoForm>
  );
}

export default Page;
