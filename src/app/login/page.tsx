import React from "react";
import LoginForm from "@compo/LoginForm";
import ClientExample from "@/components/ClientExample";
import Device from "@/components/Device";

function LoginPage() {
  return (
    <div style={{ display: "grid", placeContent: "center" }}>
      <Device>
        <LoginForm />
      </Device>
    </div>
  );
}

export default LoginPage;
