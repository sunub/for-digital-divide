"use client";

import Link from "next/link";
import _3DButton from "@/components/3DButton";
import Spacer from "@/constants/Spacer";
import { useHistory } from "@/shared/hooks/useHistory";
import { Box } from "@/shared/ui/Box";
import * as style from "./page.css";

function StartButton() {
  const { add } = useHistory();

  const handleStart = () => {
    add(window.location.href);
  };

  return (
    <_3DButton as={Link} onClick={handleStart} href={"/intro"}>
      시작하기
    </_3DButton>
  );
}

function InitPage() {
  return (
    <>
      <Box display={"flex"} px={1} backgroundColor={"onPrimary"}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Box>
      {/* <div className={style.devsiteContentSiteContent}>
        <div className={style.contentWrapper}>
          <div className={style.welcomeMessage}>
            <h1>안녕하세요!</h1>
          </div>
          <div className={style.textContainer}>
            <p>
              이 홈페이지는 단순한 <b>데모(가짜)</b> 페이지 입니다.
            </p>
            <p>
              시작하시려면 아래의 <b>시작하기</b>를 눌러주세요!
            </p>
          </div>
          <Spacer size={16} axis="vertical" />
          <StartButton />
          <Spacer size={32} axis="vertical" />
        </div>
      </div>
      <div className={style.backDrop} /> */}
    </>
  );
}

export default InitPage;
