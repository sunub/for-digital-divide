"use client";

import React from "react";
import styled from "styled-components";
import Canvas from "./page.helper";
import useToggle from "@/hooks/use-toggle";

function Page() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [isClick, toggleClick] = useToggle(false);

  const circles = Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => {
      return <Circle />;
    }),
  );

  React.useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }, []);
  return (
    <div>
      <h1>PIN</h1>
      <div ref={rootRef}>
        <canvas ref={canvasRef} style={{ border: "1px solid black" }} />
      </div>
    </div>
  );
}

function Circle() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 50 50"
    >
      <circle cx="25" cy="25" r="20" fill="white" stroke="black" />
    </svg>
  );
}

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Col = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export default Page;
