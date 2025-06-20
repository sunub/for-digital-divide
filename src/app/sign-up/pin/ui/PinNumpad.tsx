'use client';

import { FormStatus, useFormStatus } from 'react-dom';
import { useStepper } from '@/components/Stepper/hooks/useStepper';
import { Button } from '@/components/ui/button';
import { StatusButton } from '@/components/ui/status-button';
import { useNumpadStore } from '@/context/NumpadContext';
import { KeypadDetail, KeypadInfo } from '@/utils/keypad';
import reloadNumpad from '../reload';
import { nanoid } from 'nanoid';

const numpadShape = [
  ['rounded-tl-[var(--pad-button-radius)]', '', 'rounded-tr-[var(--pad-button-radius)]'],
  ['', '', ''],
  ['', '', ''],
  ['rounded-bl-[var(--pad-button-radius)]', '', 'rounded-br-[var(--pad-button-radius)]'],
];

const baseClasses = `bg-device text-[var(--pad-button-text-size)] w-[var(--pad-button-width)] h-[var(--pad-button-height)] place-content-center text-center hover:scale-105 hover:border-button-default-foreground hover:shadow-lg active:scale-95`;

const transitionStyle = {
  transition: 'all 300ms cubic-bezier(0.17,1.48,0.24,1)',
};

const inlineFlexFullCenter = 'w-full h-full inline-flex items-center justify-center';

function Pad({ x, y, className = '' }: { x: number; y: number; className?: string }) {
  return (
    <span
      className={`relative cursor-pointer ${className} scale-[--pad-button-scale]`}
      style={{ backgroundPosition: `${x}px ${y}px` }}
    />
  );
}

function PadButton({ shape, x, y, onClick }: { shape: string; x: number; y: number; onClick?: () => void }) {
  const id = nanoid();
  return (
    <li key={`pin-pad-${x}-${y}-${id}`} className={`${baseClasses} ${shape}`} style={transitionStyle}>
      <button type="button" className={inlineFlexFullCenter} onClick={onClick}>
        <Pad className="block bg-numpad w-numpad h-numpad" x={x} y={y} />
      </button>
    </li>
  );
}

function Numpad({ keypad, prefix }: { keypad: KeypadDetail; prefix: string }) {
  const updateNumpad = useNumpadStore(s => s.updateNumpad);
  return (
    <div className="flex flex-col gap-[2px]">
      {keypad.svgGrid.map((row, i) => (
        <ul key={`${prefix}-row-${i}`} className="text-device-text flex flex-row justify-center w-[273px] gap-[2px]">
          {row.map(({ x, y, num }, j) => {
            const shape = numpadShape[i][j];
            const key = `${prefix}-cell-${i}-${j}-${num}`;
            if (i == 3 && j == 0) {
              return <PadButton key={key} shape={shape} x={x} y={y} onClick={async () => await reloadNumpad()} />;
            }
            if (i == 3 && j == 2) {
              return <PadButton key={key} shape={shape} x={x} y={y} />;
            }
            return <PadButton key={key} shape={shape} x={x} y={y} onClick={() => updateNumpad(num)} />;
          })}
        </ul>
      ))}
    </div>
  );
}

function Buttons({ status }: { status: FormStatus }) {
  const deleteNumpad = useNumpadStore(s => s.deleteNumpad);

  return (
    <div className="flex flex-row justify-center w-full h-full gap-4">
      <StatusButton
        type="submit"
        size={'wide'}
        status={status.pending ? 'pending' : 'idle'}
        variant={'default'}
        disabled={status.pending}
      >
        확인
      </StatusButton>
      <Button type="button" variant={'destructive'} onClick={deleteNumpad}>
        전체삭제
      </Button>
    </div>
  );
}

export function PinNumpad({ padInfo }: { padInfo: KeypadInfo }) {
  const status = useFormStatus();
  const { keypad } = padInfo;
  useStepper();

  const prefix = nanoid();
  return (
    <>
      <Numpad keypad={keypad} prefix={prefix} />
      <Buttons status={status} />
    </>
  );
}
