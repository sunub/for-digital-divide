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
    if (isOpen) return; // 이미 열려있으면 중복 클릭 방지

    // 애니메이션 시작 (상태 변경)
    toggleOpen();

    // 히스토리 추가
    add(new URL("/intro", window.location.href).toString());

    // [핵심] 페이지 이동 요청을 즉시 시작
    // Next.js가 데이터를 가져오는(loading) 시간 동안 애니메이션(open)이 재생됨
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
