"use client";

import { Flex } from "@for-digital-divide/design-system";
import type { MotionNodeAnimationOptions } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import { useSelectedLayoutSegment } from "next/navigation";

export const pageVariants: MotionNodeAnimationOptions["variants"] = {
  initial: { opacity: 0, x: "100%", z: -1 },
  in: { opacity: 1, x: 0, z: 0 },
  out: { opacity: 0, x: "-100%", z: -1 },
};

export const pageTransition: MotionNodeAnimationOptions["transition"] = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};

export function TransitionLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const registerSegment = useSelectedLayoutSegment("modal");
  const isModalOpen = registerSegment !== null;

  return (
    <Flex>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={"dashboard"}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          style={{ width: "100%", height: "100%" }}
        >
          {isModalOpen ? modal : children}
        </motion.div>
      </AnimatePresence>
    </Flex>
  );
}
