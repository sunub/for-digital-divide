"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useHistory } from "@/shared/hooks/useHistory";
import { phone } from "./SmallPhone.css";
import { SmallPhoneLoading } from "./SmallPhoneLoading";
import { SmallPhoneSvg } from "./SmallPhoneSvg";

interface SmallPhoneProps {
  isOpen: boolean;
  toggleOpen: () => void;
}

const phoneVariants = {
  closed: { rotateX: 66, rotateZ: 45, scale: 1 },
  open: { rotateX: 0, rotateZ: 0, scale: 2.5 },
};

const SmallPhone: React.FC<SmallPhoneProps> = ({ isOpen, toggleOpen }) => {
  const router = useRouter();
  const { add } = useHistory();

  useEffect(() => {
    router.prefetch("/login");
  }, [router]);

  const handleClick = () => {
    if (isOpen) return;
    toggleOpen();
    add(new URL("/intro", window.location.href).toString());

    router.push("/login");
  };

  return (
    <motion.button
      aria-label="로그인 화면으로 이동"
      aria-disabled={isOpen}
      disabled={isOpen}
      className={phone({ isOpen })}
      onClick={handleClick}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={phoneVariants}
    >
      <SmallPhoneLoading isOpen={isOpen} />
      <SmallPhoneSvg isOpen={isOpen} />
    </motion.button>
  );
};

export { SmallPhone };
