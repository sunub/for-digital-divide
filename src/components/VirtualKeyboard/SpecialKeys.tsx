import React from "react";
import styled from "styled-components";

const Keycap = styled.button.attrs({ type: "button" })`
  border: 1px solid oklch(68.35% 0.017 292.79 / 70%);
  width: 29px;
  height: 29px;
  text-align: center;
  margin: 2px;
  position: relative;
  padding: 1px;
  min-width: 0;
  max-width: 500px;
  min-height: 0;
  max-height: 50px;

  background-image: linear-gradient(
    to bottom,
    oklch(98.05% 0 294.47) 90%,
    oklch(92.77% 0.009 292.79)
  );

  &:hover {
    transform: scale(1.125);
    transition: transform 150ms cubic-bezier(0.47, 0.31, 0.25, 0.92);
    z-index: 3;
  }
`;

const SpeicalKey = styled.span<{
  $width: number;
  $positionX: number;
  $positionY: number;
  $sizeY?: number;
}>`
  display: inline-block;

  width: ${(props) => props.$width}px;
  height: 17px;
  opacity: 0.667;

  vertical-align: text-top;
  background-image: url("/keyboard-icons.png");

  background-repeat: no-repeat;
  background-position: ${(props) => props.$positionX}px
    ${(props) => props.$positionY}px;
  background-size: 54px ${(props) => props.$sizeY}px;
`;

function DeleteKey({
  inputRef,
  ...delegated
}: {
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  return (
    <Keycap
      id={"K46"}
      {...delegated}
      style={{ width: "62px" }}
      onClick={() => {
        if (!inputRef.current) return;
        inputRef.current.value = inputRef.current.value.slice(0, -1);
        inputRef.current.focus();
      }}
    >
      <SpeicalKey
        style={{ backgroundSize: "62px 256px" }}
        $width={22}
        $positionX={-19}
        $positionY={-23}
      />
    </Keycap>
  );
}

function ChangeKey({
  setIsKorean,
  ...delegated
}: {
  setIsKorean: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Keycap
      id={"K20"}
      onClick={() => setIsKorean((prev) => !prev)}
      style={{ width: "53.75px" }}
      {...delegated}
    >
      <SpeicalKey $width={22} $positionX={-19} $positionY={-153} $sizeY={185} />
    </Keycap>
  );
}

function ShiftKey({
  setIsShift,
  ...delegated
}: {
  setIsShift: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Keycap
      id={"K16"}
      onClick={() => setIsShift((prev) => !prev)}
      style={{ width: "70.25px" }}
      {...delegated}
    >
      <SpeicalKey $width={22} $positionX={-14} $positionY={-61} $sizeY={185} />
    </Keycap>
  );
}

function BlankKey({ ...delegated }) {
  return (
    <Keycap id={"K9"} {...delegated}>
      <span>Blank</span>
    </Keycap>
  );
}

function SpaceKey({
  inputRef,
  ...delegated
}: {
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  return (
    <Keycap
      id={"K32"}
      {...delegated}
      style={{ width: "293px" }}
      onClick={() => {
        if (!inputRef.current) return;
        inputRef.current.value += " ";
        inputRef.current.focus();
      }}
    >
      <span style={{ visibility: "hidden" }}>.</span>
    </Keycap>
  );
}

function CtrlAltKey({ ...delegated }) {
  return (
    <Keycap id={"K273"} {...delegated} style={{ width: "95px" }}>
      <span style={{ fontSize: "14px" }}>Ctrl + Alt</span>
    </Keycap>
  );
}

export { DeleteKey, ChangeKey, ShiftKey, BlankKey, SpaceKey, CtrlAltKey };
