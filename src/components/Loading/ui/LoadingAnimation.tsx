"use client";

import { motion } from "motion/react";

export function LoadingAnimation({
  size = 5,
  radius = "1rem",
}: {
  size?: number;
  radius?: string;
}) {
  const circles = [
    {
      cx: 70,
      cy: "50%",
      r: radius,
      fill: "#8F76FF",
    },
    {
      cx: 170,
      cy: "50%",
      r: radius,
      fill: "#FF7E76",
    },
    { cx: 270, cy: "50%", r: radius, fill: "#8F76FF" },
    {
      cx: 370,
      cy: "50%",
      r: radius,
      fill: "#98DF9F",
    },
    {
      cx: 470,
      cy: "50%",
      r: radius,
      fill: "#8F76FF",
    },
  ].slice(0, size);

  return (
    <motion.svg
      width={556}
      height="120"
      viewBox="0 0 556 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        margin: "auto",
      }}
    >
      <title>Loading Animation</title>
      {circles.map((circle, index) => {
        const startY = 10 - 7.5;
        const endY = 7.5 + 13;

        return (
          <motion.circle
            key={circle.cx}
            cx={`calc(${circle.cx}px + (${circle.r} / 2))`}
            cy={circle.cy}
            r={circle.r}
            fill={circle.fill}
            initial={{ transform: `translateY(${startY}px)` }}
            animate={{ transform: `translateY(${endY}px)` }}
            transition={{
              delay: 200 * Math.sin(0.001 * index),
              duration: 10,
              type: "spring",
              damping: 9,
              stiffness: 120,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.001,
            }}
          />
        );
      })}
    </motion.svg>
  );
}
