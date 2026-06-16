"use client";

import { Flex } from "@internal/design-system/primitives";
import type { MotionNodeAnimationOptions } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

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
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const layoutKey = "dashboard-content";

  return (
    <Flex className={className} width="full" position="relative">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={layoutKey}
          initial={hasHydrated ? "initial" : false}
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          style={{ width: "100%", height: "100%" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </Flex>
  );
}
