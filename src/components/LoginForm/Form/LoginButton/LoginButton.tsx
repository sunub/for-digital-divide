import * as Styled from "../Form.styled";

interface LoginButtonProps {
  id: string;
  password: string;
  setIsValid: React.Dispatch<
    React.SetStateAction<{
      id: boolean;
      password: boolean;
    }>
  >;
}

function LoginButton() {
  return (
    <Styled.Button id={"submit-id-pwd-btn"} type="submit">
      로그인
    </Styled.Button>
  );
}

export default LoginButton;
