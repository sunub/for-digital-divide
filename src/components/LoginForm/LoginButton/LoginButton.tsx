import * as Styled from "@/components/FidoForm/FidoForm.style";
interface LoginButtonProps {
  togglePending: () => void;
}

function LoginButton(props: LoginButtonProps) {
  const { togglePending } = props;

  return (
    <Styled.Button
      id={"submit-id-pwd-btn"}
      type="submit"
      onClick={togglePending}
    >
      로그인
    </Styled.Button>
  );
}

export default LoginButton;
