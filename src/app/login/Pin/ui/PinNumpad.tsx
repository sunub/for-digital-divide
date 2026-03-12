"use client";

import { Button } from "@for-digital-divide/design-system";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useTransition } from "react";
import { type FormStatus, useFormStatus } from "react-dom";
import { StatusButton } from "@/components/StautsButton";
import { useNumpadStore } from "@/context/NumpadContext";
import type { KeypadDetail, KeypadInfo } from "@/entities/keypad/keypad.model";
import reloadNumpad from "../utils/reload";
import * as style from "./PinNumpad.css";

type ShapeType = "tl" | "tr" | "bl" | "br" | "none";

const numpadShapeGrid = [
  ["tl", "none", "tr"],
  ["none", "none", "none"],
  ["none", "none", "none"],
  ["bl", "none", "br"],
] as const;

const ROW = 4;
const NUM_PAD_SLOTS = Array.from({ length: ROW }, (_, i) => i);

function Pad({
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
  x,
  y,
  onClick,
  label,
  disabled,
}: {
  shape: ShapeType;
  x: number;
  y: number;
  onClick?: () => void;
  label: string;
  disabled?: boolean;
}) {
  return (
    <li className={style.padButtonItem({ shape })}>
      <button
        type="button"
        className={style.innerButton}
        onClick={onClick}
        aria-label={label}
        disabled={disabled}
      >
        <Pad x={x} y={y} />
      </button>
    </li>
  );
}

function Numpad({ keypad }: { keypad: KeypadDetail }) {
  const updateNumpad = useNumpadStore((s) => s.updateNumpad);
  const [isPending, startTransition] = useTransition();

  const handleReload = () => {
    startTransition(async () => {
      await reloadNumpad();
    });
  };

  return (
    <div className={style.numpadWrapper}>
      {keypad.svgGrid.map((row, i) => (
        <ul key={NUM_PAD_SLOTS[i]} className={style.numpadRow}>
          {row.map(({ x, y }, j) => {
            const shape = numpadShapeGrid[i][j] as ShapeType;
            const key = `cell-${i}-${j}`;

            if (i === 3 && j === 0) {
              return (
                <PadButton
                  key={key}
                  shape={shape}
                  x={x}
                  y={y}
                  label="키패드 재배열"
                  onClick={handleReload}
                  disabled={isPending}
                />
              );
            }
            if (i === 3 && j === 2) {
              return (
                <PadButton
                  key={key}
                  shape={shape}
                  x={x}
                  y={y}
                  label="빈 칸"
                  disabled
                />
              );
            }

            return (
              <PadButton
                key={key}
                shape={shape}
                x={x}
                y={y}
                label="보안 키패드 숫자"
                onClick={() => updateNumpad({ x, y })}
              />
            );
          })}
        </ul>
      ))}
    </div>
  );
}

function Buttons({ status }: { status: FormStatus }) {
  const deleteNumpad = useNumpadStore((s) => s.deleteNumpad);

  return (
    <div className={style.actionButtons}>
      <StatusButton
        type="submit"
        size={"wide"}
        status={status.pending ? "pending" : "idle"}
        variant={"default"}
        disabled={status.pending}
      >
        확인
      </StatusButton>
      <Button
        type="button"
        variant={"destructive"}
        onClick={deleteNumpad}
        aria-label="입력한 핀 번호 전체 삭제"
      >
        전체삭제
      </Button>
    </div>
  );
}

export function PinNumpad({ padInfo }: { padInfo: KeypadInfo }) {
  const status = useFormStatus();
  const { keypad } = padInfo;

  return (
    <div id="register-pin__numpad-container" className={style.container}>
      <Numpad keypad={keypad} />
      <Buttons status={status} />
    </div>
  );
}
