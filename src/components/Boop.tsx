"use client";

import React from "react";
// import useBoop from "@/hooks/use-boop.hook";
import { motion } from "framer-motion";

interface UseBoopConfig {
  x?: number;
  y?: number;
  rotation?: number;
  scale?: number;
  timing?: number;
  springConfig?: {
    tension: number;
    friction: number;
  };
}

function Boop({
  children,
  boopConfig,
}: {
  children: React.ReactNode;
  boopConfig: UseBoopConfig;
}) {
  //   const [style, trigger] = useBoop(boopConfig);

  return (
    <></>
    // <motion.span style={style as any} onMouseEnter={trigger}>
    //   {children}
    // </motion.span>
  );
}

export default Boop;
