import { assignInlineVars } from "@vanilla-extract/dynamic";
import { type ComponentProps, useTransition } from "react";
import reloadNumpad from "@/app/onboarding/Pin/utils/reload";
import { useNumpadStore } from "@/context/NumpadContext";
import type { KeypadDetail } from "@/entities/keypad/keypad.model";
import * as style from "./PinNumpad.css";

type NumpadData = { x: number; y: number; num: string };
type ShapeType = "tl" | "tr" | "bl" | "br" | "none";

interface PadButtonProps extends ComponentProps<"button"> {
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
  ...props
}: PadButtonProps) {
  return (
    <li className={style.padButtonItem({ shape })}>
      <button
        type="button"
        className={style.innerButton}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    </li>
  );
}

export function Numpad({
  keypad,
  hashes,
}: {
  keypad: KeypadDetail;
  hashes: [string, number][];
}) {
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

    const handleClick = () => {
      updateNumpad({ x: data.x, y: data.y });
    };

    const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
      const target = e.currentTarget;
      const mapping = new Map(hashes);
      const realNum = mapping.get(data.num);

      if (realNum !== undefined) {
        target.setAttribute("aria-label", `${realNum}번 버튼`);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
      const target = e.currentTarget;
      target.removeAttribute("aria-label");
    };

    return (
      <PadButton
        key={key}
        shape={shape}
        label="보안 키패드 숫자"
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
