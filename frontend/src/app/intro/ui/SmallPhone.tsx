"use client";

import { motion } from "motion/react";
import { phone } from "./SmallPhone.css";
import { SmallPhoneLoading } from "./SmallPhoneLoading";
import { SmallPhoneSvg } from "./SmallPhoneSvg";

interface SmallPhoneProps {
  isOpen: boolean;
}

const phoneVariants = {
  closed: { rotateX: 66, rotateZ: 45, scale: 1 },
  open: { rotateX: 0, rotateZ: 0, scale: 2.5 },
};

const SmallPhone: React.FC<SmallPhoneProps> = ({ isOpen }) => {
  return (
    <motion.div
      aria-label="로그인 화면으로 이동"
      aria-disabled={isOpen}
      className={phone({ isOpen })}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={phoneVariants}
    >
      <SmallPhoneLoading isOpen={isOpen} />
      <SmallPhoneSvg isOpen={isOpen} />
    </motion.div>
  );
};

export { SmallPhone };
