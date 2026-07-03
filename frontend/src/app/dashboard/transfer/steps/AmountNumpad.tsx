import { Flex } from "@internal/design-system/primitives";
import type { ComponentProps } from "react";
import * as style from "@/components/Pin/PinNumpad/PinNumpad.css";
import { numpad } from "./AmountNumpad.css";

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
        aria-label={label}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
        {...props}
      >
        {children}
      </button>
    </li>
  );
}

export function AmountNumpad({
  onInput,
  onDelete,
}: {
  onInput: (num: string) => void;
  onDelete: () => void;
}) {
  const layout = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["00", "0", "DEL"],
  ];

  const renderSlot = (rowIndex: number, colIndex: number, val: string) => {
    const shape = numpadShapeGrid[rowIndex][colIndex] as ShapeType;
    const key = `cell-${rowIndex}-${colIndex}`;

    if (val === "DEL") {
      return (
        <PadButton key={key} shape={shape} label="지우기" onClick={onDelete}>
          ←
        </PadButton>
      );
    }

    return (
      <PadButton
        key={key}
        shape={shape}
        label={`${val} 버튼`}
        onClick={() => onInput(val)}
      >
        {val}
      </PadButton>
    );
  };

  return (
    <Flex direction={"column"} width={"full"} className={numpad}>
      {layout.map((row, rowIndex) => (
        <ul key={`row-${row.join("-")}`} className={style.numpadRow}>
          {row.map((cellData, colIndex) =>
            renderSlot(rowIndex, colIndex, cellData),
          )}
        </ul>
      ))}
    </Flex>
  );
}
