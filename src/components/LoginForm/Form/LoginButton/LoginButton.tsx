import * as Styled from "../Form.styled";

interface LoginButtonProps {
  id: string;
  password: string;
  setIsIdValid: React.Dispatch<
    React.SetStateAction<{
      id: boolean;
      password: boolean;
    }>
  >;
}

function LoginButton({ props }: { props: LoginButtonProps }) {
  const { id, password, setIsIdValid } = props;
  return (
    <Styled.Button
      id={"submit-id-pwd-btn"}
      type="submit"
      onClick={() => {
        if (id.length >= 6 && id.length <= 20) {
          setIsIdValid((prev) => ({ ...prev, id: true }));
        }
        if (password.length >= 8) {
          setIsIdValid((prev) => ({ ...prev, password: true }));
        }

        if (id.length < 6 || id.length > 20) {
          setIsIdValid((prev) => ({ ...prev, id: false }));
        } else if (password.length < 8) {
          setIsIdValid((prev) => ({ ...prev, password: false }));
        }
      }}
    >
      로그인
    </Styled.Button>
  );
}

export default LoginButton;
