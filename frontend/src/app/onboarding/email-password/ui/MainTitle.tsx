"use client";

import { Text } from "@internal/design-system/components";
import { motion, useSpring } from "motion/react";
import { memo, useEffect, useState } from "react";
import * as style from "./MainTitle.css";

const TITLE_SLOT = Array.from({ length: 3 }, (_, i) => i);

export const MainTitle = memo(() => {
  const [translateY, setTranslateY] = useState([
    useSpring("1.1rem"),
    useSpring("-1.2rem"),
    useSpring("-2.3rem"),
  ]);
  const [translateX, setTranslateX] = useState([
    useSpring("-2rem"),
    useSpring("0rem"),
    useSpring("2rem"),
  ]);
  const opacity = useSpring(1);

  useEffect(() => {
    setTranslateY((prev) => {
      prev.forEach((spring) => {
        spring.set("0rem");
      });
      return prev;
    });
    setTranslateX((prev) => {
      prev.forEach((spring) => {
        spring.set("0rem");
      });
      return prev;
    });
    opacity.set(1);
  }, [opacity]);

  return (
    <div className={style.container}>
      <motion.h1 className={style.title} style={{ opacity }}>
        {"로그인".split("").map((char, index) => (
          <motion.span
            key={TITLE_SLOT[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              display: "inline-block",
              translateY: translateY[index],
              translateX: translateX[index],
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <Text variant={"description"}>
        이메일과 비밀번호를 사용해 로그인 해주세요
      </Text>
      <p className={style.description}></p>
    </div>
  );
});

// export const description = style({
//   color:
//     "color-mix(in oklch, oklch(63.93% 0.206 288.34), var(--color-primary) 20%)",
//   fontSize: "1rem",
//   marginTop: "0.5rem",
//   fontWeight: 400,
// });
