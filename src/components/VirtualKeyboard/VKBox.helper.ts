function handleMouseMove(
  e: MouseEvent,
  position: {
    cursorX: number;
    cursorY: number;
    boxX: number;
    boxY: number;
  }
) {
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

function getCursorBasePosition(
  e: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent
) {
  const startX = e.clientX;
  const startY = e.clientY;

  const keyboard = document.getElementById("vk-box")!;
  const boxPosition = keyboard.getBoundingClientRect();
  const boxStartX = boxPosition.x;
  const boxStartY = boxPosition.y;

  return {
    cursorX: startX,
    cursorY: startY,
    boxX: boxStartX,
    boxY: boxStartY,
  };
}

export { getCursorBasePosition, handleMouseMove };
