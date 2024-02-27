"use client";

import FidoForm from "@/components/FidoForm";
import Password from "@/components/LoginForm/LoginInput/Password";
import { fidoPasswordAction } from "@/lib/fido/password/action";
import { redirect } from "next/navigation";

function Page() {
  return (
    <FidoForm
      key={"fido-login__password"}
      type="password"
      action={(formData) => fidoPasswordAction(formData)}
      redirect={() => redirect("/dashboard")}
    >
      <Password />
    </FidoForm>
  );
}

export default Page;
