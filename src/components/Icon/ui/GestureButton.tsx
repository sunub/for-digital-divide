import { press, useAnimate } from 'motion/react';
import { Gesture } from '../style';

function Gesturebutton({ children }: { children: React.ReactNode }) {
  const [scope, animate] = useAnimate();
  const hanleClick = () => {
    press(scope.current, (el) => {
      animate(el, { scale: 0.8 }, { type: 'spring', stiffness: 1000 });
      return () =>
        animate(el, { scale: 1 }, { type: 'spring', stiffness: 500 });
    });
  };

  return (
    <Gesture ref={scope} onClick={hanleClick} type="button">
      {children}
    </Gesture>
  );
}

export { Gesturebutton };
