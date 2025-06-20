import { useAtom } from 'jotai';
import { AngryIcon, FrownIcon, InfoIcon, LaughIcon, PartyPopperIcon } from 'lucide-react';
import { motion, useAnimation, Variants } from 'motion/react';
import { useEffect } from 'react';
import { toastsAtom } from '../atom';
import { Message, SuccessIconContainer, Text } from '../style';
import { FlexCenterDiv } from '@/shared/style/component/div';

const toastVariants: Variants = {
  initial: { opacity: 0, y: -50 },
  animate: (custom: { length: number; index: number }) => ({
    opacity: 1,
    y: (custom.length - custom.index - 1) * 10,
  }),
  exit: { opacity: 0, y: -50 },
};

function ToastStatus({ type }: { type: string }) {
  switch (type) {
    case 'success':
      return (
        <SuccessIconContainer>
          <PartyPopperIcon className="icon" />
          <LaughIcon className="icon" />
        </SuccessIconContainer>
      );
    case 'error':
      return <FrownIcon className="icon" />;
    case 'info':
      return <InfoIcon className="icon" />;
    case 'warning':
      return <AngryIcon className="icon" />;
    default:
      return null;
  }
}

function Messages({ message }: { message: string[] }) {
  return (
    <FlexCenterDiv style={{ flexDirection: 'column' }}>
      {message.map((msg, index) => (
        <Text key={index}>{msg}</Text>
      ))}
    </FlexCenterDiv>
  );
}

export function ToastMessage({
  toast,
  index,
  length,
}: {
  toast: { id: string; type: string; message: string[] };
  index: number;
  length: number;
}) {
  const controls = useAnimation();
  const [, dispatch] = useAtom(toastsAtom);

  useEffect(() => {
    controls.start('animate');
    const timer = setTimeout(() => {
      controls.start('exit').then(() => dispatch({ type: 'remove', payload: { id: toast.id } }));
    }, 3000);
    return () => clearTimeout(timer);
  }, [controls, dispatch, index, length, toast.id]);

  return (
    <Message
      as={motion.div}
      custom={{ length, index }}
      variants={toastVariants}
      initial="initial"
      animate={controls}
      exit="exit"
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ zIndex: index }}
      className={`toast ${toast.type}`}
    >
      <ToastStatus type={toast.type} />
      <Messages message={toast.message} />
    </Message>
  );
}
