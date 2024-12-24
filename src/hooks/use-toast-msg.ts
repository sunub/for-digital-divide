import { useNotificationStore } from '@/context/NotificationContext';
import { useAnimate } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';

interface ToastMsgProps {
  id: string;
  message: string;
  type: 'error' | 'success' | 'default';
}

function useToastMsg() {
  const { add, remove } = useNotificationStore((state) => state);
  const [_, animate] = useAnimate();

  const timerRef = useRef<{ [key: string]: number }>({});
  const showToastMsg = useCallback(
    ({ id, message, type }: ToastMsgProps) => {
      add({ id, message, type });

      const timer = window.setTimeout(() => {
        const listItem = document.querySelector(`li#${id}`) as HTMLElement;
        if (!listItem) return;

        animate(listItem, {
          y: ['0%', '100%'],
          opacity: [1, 0],
        }).then(() => remove(id));

        delete timerRef.current[id];
      }, 1500);

      timerRef.current[id] = timer;
    },
    [add],
  );

  useEffect(() => {
    return () => {
      Object.values(timerRef.current).forEach((timer) => clearTimeout(timer));
      timerRef.current = {};
    };
  }, []);

  return showToastMsg;
}

export { useToastMsg };
