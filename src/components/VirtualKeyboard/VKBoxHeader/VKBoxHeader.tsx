import React from "react";
import styled from "styled-components";
import { getCursorBasePosition } from "./VKBoxHeader.helper";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  cursor: move;
`;

const style: React.CSSProperties = { whiteSpace: "nowrap", userSelect: "none" };

function VKBoxHeader({
  inputRef,
}: {
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  const [isMouseDown, setIsMouseDown] = React.useState(false);
  const [position, setPosition] = React.useState({
    cursorX: 0,
    cursorY: 0,
    boxX: 0,
    boxY: 0,
  });

  React.useEffect(() => {
    const mouseDownHandler = () => setIsMouseDown(false);

    if (isMouseDown) {
      window.addEventListener("mouseup", mouseDownHandler);
      return () => window.removeEventListener("mouseup", mouseDownHandler);
    }
  }, [isMouseDown]);

  React.useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (inputRef.current) inputRef.current.focus();

      const keyboard = document.getElementById("vk-box")!;

      const moveX = position.cursorX - e.clientX;
      const moveY = position.cursorY - e.clientY;

      const nextPositionX = Math.min(
        Math.max(position.boxX - moveX, 0),
        document.body.clientWidth - 495
      );
      const nextPositionY = Math.min(
        Math.max(position.boxY - moveY, 0),
        document.body.clientHeight - 233
      );

      keyboard.style.left = `${nextPositionX}px`;
      keyboard.style.top = `${nextPositionY}px`;
    }

    if (isMouseDown) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [isMouseDown, position, inputRef]);

  return (
    <Wrapper
      dir="ltr"
      style={style}
      onMouseDown={(e) => {
        const newPosition = getCursorBasePosition(e);
        setPosition(newPosition);
        setIsMouseDown(true);
      }}
    >
      <div>
        <span>keyboard</span>
      </div>
      <button
        onClick={() => {
          const vkBox = document.getElementById("vk-box") as HTMLDivElement;
          vkBox.style.display = "none";
        }}
      >
        <span className="material-icons">close</span>
      </button>
    </Wrapper>
  );
}

export default VKBoxHeader;
