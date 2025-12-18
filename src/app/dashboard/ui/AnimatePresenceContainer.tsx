"use client";

import {
  AnimatePresence,
  type MotionNodeAnimationOptions,
  motion,
} from "motion/react";
import * as style from "./AnimatePresenceContainer.css";

const pageVariants: MotionNodeAnimationOptions["variants"] = {
  initial: { opacity: 0, x: "100%", z: -1 },
  in: { opacity: 1, x: 0, z: 0 },
  out: { opacity: 0, x: "-100%", z: -1 },
};

const pageTransition: MotionNodeAnimationOptions["transition"] = {
  type: "tween",
  ease: "backIn",
  duration: 0.4,
};

export function AnimatePresenceContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={style.animatePresenceRootContainer}
        key={"dashboard-main-page"}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        style={{ width: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
