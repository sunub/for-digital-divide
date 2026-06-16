"use client";

import { Box, Flex } from "@internal/design-system/primitives";
import { HandIcon, SmileIcon } from "lucide-react";
import { motion, useAnimate } from "motion/react";
import { useCallback } from "react";
import * as style from "./DashboardHeader.css";

export function UsernameSection({ children }: { children: React.ReactNode }) {
  const [scope, animate] = useAnimate();

  const enterAnimation = useCallback(() => {
    animate(scope.current, { scale: [0, 1, 1.2, 1] }, { duration: 0.5 });
    animate(scope.current, { rotate: [0, 80, -30, 80, 40] }, { duration: 1 });
  }, [animate, scope.current]);

  const exitAnimation = useCallback(() => {
    animate(
      scope.current,
      { rotate: [40, -80, 30, -80, 0] },
      { duration: 0.5 },
    );
    animate(scope.current, { scale: [1, 1.2, 1, 0] }, { duration: 1 });
  }, [animate, scope.current]);

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      gap={3}
      onMouseEnter={enterAnimation}
      onMouseLeave={exitAnimation}
    >
      <Box position="relative">
        <motion.div
          className={style.handIconContainer}
          ref={scope}
          initial={{ rotate: 0, scale: 0 }}
          transition={{
            duration: 3,
            ease: "anticipate",
            repeat: Infinity,
          }}
        >
          <HandIcon size={18} strokeWidth={3} fill="white" />
        </motion.div>
        <SmileIcon size={18} strokeWidth={3} fill="white" />
      </Box>

      {children}
    </Flex>
  );
}
