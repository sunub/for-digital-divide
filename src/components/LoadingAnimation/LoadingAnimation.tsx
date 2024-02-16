"use client";

import { motion } from "framer-motion";

function LoginAnimation() {
  const circles = [
    {
      cx: "10",
      cy: "15",
      r: 5,
      fill: "#8F76FF",
    },
    {
      cx: "32",
      cy: "15",
      r: 5,
      fill: "#FF7E76",
    },
    { cx: "53", cy: "15", r: 5, fill: "#8F76FF" },
    {
      cx: "72",
      cy: "15",
      r: 5,
      fill: "#98DF9F",
    },
    {
      cx: "96",
      cy: "15",
      r: 5,
      fill: "#8F76FF",
    },
  ];

  return (
    <motion.svg
      width="106"
      height="70"
      viewBox="0 0 106 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {circles.map((circle, index) => {
        const startY = 10 - 7.5;
        const endY = 7.5 + 13;

        return (
          <motion.circle
            key={index}
            cx={circle.cx}
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

export default LoginAnimation;
