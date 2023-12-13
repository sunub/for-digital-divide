import styled from "styled-components";
import { Page } from "./page.style";
import LoginForm from "@/components/LoginForm";

function LoginPage() {
  return (
    <Page>
      <h1>Login Page</h1>
      <LoginForm />
    </Page>
  );
}

export default LoginPage;
