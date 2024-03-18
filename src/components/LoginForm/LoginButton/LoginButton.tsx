import * as Styled from '@/components/FidoForm/FidoForm.style';
interface LoginButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  togglePending: () => void;
}

function LoginButton({
  content,
  togglePending,
  ...delegated
}: LoginButtonProps) {
  return (
    <Styled.Button
      id={'submit-id-pwd-btn'}
      type="submit"
      onClick={togglePending}
      {...delegated}
    >
      {content}
    </Styled.Button>
  );
}

export default LoginButton;
