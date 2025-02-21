import VisuallyHidden from '@/components/VisuallyHidden';
import { GestureCircle } from '../style';
import { Gesturebutton } from './GestureButton';

function BackBtn() {
  return (
    <Gesturebutton>
      <svg
        width="68"
        height="68"
        viewBox="0 0 68 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <GestureCircle cx="34" cy="34" r="30" fill="none" stroke="none" />
        <path
          d="M34 24L26.1213 31.8787C24.9497 33.0503 24.9497 34.9497 26.1213 36.1213L34 44"
          stroke="color-mix(in oklch, oklch(42.44% 0.011 17.58), transparent)"
          strokeWidth={'2'}
          strokeLinecap="round"
        />
      </svg>
      <VisuallyHidden>뒤로가기 버튼</VisuallyHidden>
    </Gesturebutton>
  );
}

export { BackBtn };
