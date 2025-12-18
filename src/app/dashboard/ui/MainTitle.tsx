"use client";

import { motion, useSpring } from "motion/react";
import { memo, useEffect } from "react";
import * as style from "./MainTitle.css";

export const MainTitle = memo(() => {
  const width = useSpring("1px");

  useEffect(() => {
    width.set("100px");
  }, [width]);

  return (
    <div className={style.rootContainer}>
      <div className={style.titleContainer}>
        <span>디지털</span>
        <motion.svg
          className={style.svg}
          key={"divide-line"}
          style={{ width }}
          height={"10px"}
          viewBox={`0 0 100 10`}
        >
          <title>Divide line</title>
          <motion.rect style={{ width }} height={"2px"} />
        </motion.svg>
        <span>격차</span>
      </div>
      <span>좁히기</span>
    </div>
  );
});
