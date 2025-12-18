import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useTransition } from "react";
import reloadNumpad from "@/app/login/Pin/utils/reload";
import { useNumpadStore } from "@/context/NumpadContext";
import type { KeypadDetail } from "@/types/keypad";
import * as style from "./PinNumpad.css";

type NumpadData = { x: number; y: number; num: string };
type ShapeType = "tl" | "tr" | "bl" | "br" | "none";

interface PadButtonProps {
  shape: ShapeType;
  onClick?: () => void;
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const numpadShapeGrid = [
  ["tl", "none", "tr"],
  ["none", "none", "none"],
  ["none", "none", "none"],
  ["bl", "none", "br"],
] as const;

const getRowKey = (rowIndex: number) => `numpad-row-${rowIndex}`;
function PadIcon({
  x,
  y,
  className = "",
}: {
  x: number;
  y: number;
  className?: string;
}) {
  return (
    <span
      className={`${style.padIcon} ${className}`}
      style={assignInlineVars({
        [style.bgPosX]: `${x}px`,
        [style.bgPosY]: `${y}px`,
      })}
      aria-hidden="true"
    />
  );
}

function PadButton({
  shape,
  onClick,
  label,
  disabled,
  children,
}: PadButtonProps) {
  return (
    <li className={style.padButtonItem({ shape })}>
      <button
        type="button"
        className={style.innerButton}
        onClick={onClick}
        aria-label={label}
        disabled={disabled}
      >
        {children}
      </button>
    </li>
  );
}

export function Numpad({ keypad }: { keypad: KeypadDetail }) {
  const updateNumpad = useNumpadStore((s) => s.updateNumpad);
  const [isPending, startTransition] = useTransition();

  const handleReload = () => {
    startTransition(async () => {
      await reloadNumpad();
    });
  };

  const renderSlot = (rowIndex: number, colIndex: number, data: NumpadData) => {
    const shape = numpadShapeGrid[rowIndex][colIndex] as ShapeType;
    const key = `cell-${rowIndex}-${colIndex}`;
    const coordinateKey = `${rowIndex}-${colIndex}`;

    const specialSlots: Record<string, React.ReactNode> = {
      "3-0": (
        <PadButton
          key={key}
          shape={shape}
          label="키패드 재배열"
          onClick={handleReload}
          disabled={isPending}
        >
          <PadIcon x={data.x} y={data.y} />
        </PadButton>
      ),
      "3-2": (
        <PadButton key={key} shape={shape} label="빈 칸" disabled>
          <PadIcon x={data.x} y={data.y} />
        </PadButton>
      ),
    };

    if (specialSlots[coordinateKey]) {
      return specialSlots[coordinateKey];
    }

    return (
      <PadButton
        key={key}
        shape={shape}
        label="보안 키패드 숫자"
        onClick={() => updateNumpad({ x: data.x, y: data.y })}
      >
        <PadIcon x={data.x} y={data.y} />
      </PadButton>
    );
  };

  return (
    <div className={style.numpadWrapper}>
      {keypad.svgGrid.map((row, rowIndex) => (
        <ul key={getRowKey(rowIndex)} className={style.numpadRow}>
          {row.map((cellData, colIndex) =>
            renderSlot(rowIndex, colIndex, cellData),
          )}
        </ul>
      ))}
    </div>
  );
}
