'use client';

import React from 'react';
import useToggle from '@/hooks/use-toggle';

function CheckBox({
  id,
  name,
  required,
}: {
  id: string;
  name: string;
  required?: boolean;
}) {
  const [isChecked, toggleChecked] = useToggle(false);

  return (
    <React.Fragment>
      <button
        type="button"
        className={`flex items-center justify-center w-1 h-1 ${isChecked ? 'bg-confirm' : 'bg-slate-100'} border-solid border-2 ${isChecked ? 'border-slate-100' : 'border-slate-800'} p-2 rounded-md text-slate-100`}
        aria-invalid={false}
        onClick={toggleChecked}
      >
        {isChecked && <span className="material-icons text-xs">done</span>}
      </button>
      <input
        required={required}
        aria-hidden={true}
        tabIndex={-1}
        name={name}
        type="checkbox"
        value={'on'}
        id={id}
        className="text-lg leading-none"
        checked={isChecked}
        onChange={toggleChecked}
        style={{
          position: 'absolute',
          transform: 'translateX(-100%)',
          pointerEvents: 'none',
          width: '24px',
          height: '24px',
          margin: '0px',
          opacity: 0,
        }}
      />
    </React.Fragment>
  );
}

export default CheckBox;
