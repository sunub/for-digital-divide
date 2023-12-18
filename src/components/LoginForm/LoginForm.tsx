import Form from "@/compo/Form";
import * as styled from "./LoginForm.styled";
import FormHeader from "../FormHeader";

function LoginForm() {
  return (
    <styled.Wrapper>
      <FormHeader />
      <Form />
    </styled.Wrapper>
  );
}

export default LoginForm;
