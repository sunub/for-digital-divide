"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Button from "@/components/Button";
import Spacer from "@/constants/Spacer";
import { useHistory } from "@/shared/hooks/useHistory";
import * as style from "./page.css";


function StartButton() {
	const router = useRouter();
	const { add } = useHistory();

	const handleStart = () => {
		add(window.location.href);
		router.push("/intro");
	};

	return <Button onClick={handleStart}>시작하기</Button>;
}

function InitPage() {
	return (
		<React.Fragment>
			<div className={style.devsiteContentSiteContent}>
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
			<div className={style.backDrop} />
		</React.Fragment>
	);
}

export default InitPage;
