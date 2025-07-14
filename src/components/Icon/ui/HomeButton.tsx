import VisuallyHidden from '@/components/VisuallyHidden';
import { Gesturebutton } from './GestureButton';
import { GestureCircle } from '../style';

function HomeBtn() {
  return (
    <Gesturebutton>
      <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
        <GestureCircle cx="34" cy="34" r="30" fill="none" stroke="none" />
        <rect
          x="24.5"
          y="24.5"
          width="19"
          height="19"
          rx="3.5"
          stroke="color-mix(in oklch, oklch(42.44% 0.011 17.58), transparent)"
          strokeWidth={'2'}
        />
      </svg>
      <VisuallyHidden>홈 버튼</VisuallyHidden>
    </Gesturebutton>
  );
}

export { HomeBtn };
