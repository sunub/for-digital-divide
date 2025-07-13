'use client';

import { animate, motion, press } from 'motion/react';
import { memo, useState } from 'react';

function Icon() {
  const [rotation, setRotation] = useState(0);

  const handleClick = () => {
    press('.reload-button', el => {
      animate(el, { scale: 0.8 }, { type: 'spring', stiffness: 1000 });
      return () => animate(el, { scale: 1 }, { type: 'spring', stiffness: 500 });
    });
    setRotation(prev => prev + 360);
    window.location.reload();
  };

  return (
    <motion.button
      onClick={handleClick}
      className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-600 hover:bg-slate-500 text-gray-100 absolute top-4 right-4 reload-button transition-colors p-2"
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-rotate-cw"
        animate={{ rotate: rotation }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </motion.svg>
    </motion.button>
  );
}

const ReloadButton = memo(Icon);

export { ReloadButton };
