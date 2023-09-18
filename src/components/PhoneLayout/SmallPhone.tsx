"use client";

import React, { CSSProperties } from "react";
import styled from "styled-components";
import Boop from "../Boop";
import { animated, useSpring, useSpringRef, config } from "@react-spring/web";

const Container = styled(animated.div)`
	display: flex;
	justify-content: center;

	width: 100%;
	height: 100%;

	position: relative;
	container: phone-frame / size;

	transition: background 10s cubic-bezier(0.165, 0.84, 0.44, 1);

	margin-left: auto;
	margin-right: auto;
	padding-left: 32px;
	padding-right: 32px;
`

const Phone = styled(animated.button)`
	border-radius: 4rem;

	display: flex;
	gap: 0 2rem;
	position: relative;
	align-self: center;
	justify-content: center;

	cursor: pointer;
	outline-offset: 4px;
	/* transform: rotateX(66deg) rotateZ(45deg) scale(0.15); */
	:focus:not(:focus-visible) {
		outline: none;
	}
`;
const Frame = styled(animated.span) <{ $layerColors: string } >`
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0px;
    left: 0px;

    background: transparent;
    border-radius: 3.5rem;
    box-shadow: 
        inset -0.3rem -0.3rem 0.1rem 0.2rem oklch(70.4% 0.037 264.08),
        inset -0.7rem -0.7rem 0.1rem 0.2rem oklch(50% 0.037 264.08),
        inset -1rem -1rem 0 0.4rem oklch(37.76% 0.012 264.08 / .3),
        ${(props) => props.$layerColors},
        3rem 3rem 1rem 2px oklch(32.3% 0.002 247.36);
`;

const Screen = styled.path`
	filter: blur(15px);

	@keyframes screen_brighter {
		0% {
			fill: oklch(37.76% 0.012 264.08 / 0.3);
		}

		85% {
			fill: oklch(95% 0 188);
		}

		100% {
			fill: oklch(37.76% 0.012 264.08 / 0.3);
		}
	}
`;

const Icon = styled.span`
	transform: translateX(-5px) translateY(-5px) scaleY(1.015);
`;

function layered_shadow(layer: number, gapX: number, gapY: number, color: string): string {
	let values = "";

	for (let i = 0; i < layer; i++) {
		let value = `${(i * gapX).toFixed(1)}rem ${(i * gapY).toFixed(
			1
		)}rem ${color}`;
		values += `${value} ,`;
	}

	return values.slice(0, values.length - 1);
}

export default function SmallPhone() {
	const [open, setOpen] = React.useState(false);
	const scalingApi = useSpringRef();

	const scaling = useSpring({
		ref: scalingApi,
		config: config.stiff,
		from: {
			transfrom: "rotateX(66deg) rotateZ(45deg) scale(0.15)",
			background: "radial-gradient(farthest-corner at 50% 70%, oklch(75.62% 0.01 188.98) 0%, oklch(41.19% 0.084 247.36) 100%)",
			layer: 9
		},
	})

	const handleClick = () => {
		setOpen((prev) => {
			scalingApi.start({
				to: {
					transfrom: open ? "rotateX(0deg) rotateZ(0deg) scale(0.15)" : "rotateX(66deg) rotateZ(45deg) scale(0.15)",
					background: open ? "radial-gradient(farthest-corner at 50% 70%, oklch(65.95% 0.145 244.91) 0%, oklch(96.58% 0.007 244.91) 100%)" : "radial-gradient(farthest-corner at 50% 70%, oklch(75.62% 0.01 188.98) 0%, oklch(41.19% 0.084 247.36) 100%)"
				}
			})
			const newOpen = !prev;
			return newOpen
		});
		console.log(open)
	}
	return (
		<Container
			style={{
				background: scaling.background
			}}
		>
			<Phone
				style={{
					transform: scaling.transfrom
				}}
				onClick={() => {
					handleClick()
					console.log(open)
				}}
			>
				<Frame
					$layerColors={layered_shadow(
						9,
						0.3,
						0.3,
						`oklch(70.4% 0.037 264.08)`
					)}
				/>
				<Icon>
					<svg
						width="376"
						height="779"
						viewBox="0 0 376 779"
						fill={"none"}
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							id="OuterFrame"
							d="M0 44C0 19.6995 19.6995 0 44 0H332C356.301 0 376 19.6995 376 44V735C376 759.301 356.301 779 332 779H44C19.6995 779 0 759.301 0 735V44Z"
							fill={"oklch(40% 0.037 264.08)"}
						/>
						<path
							id="InnerShadow"
							d="M9.15881 46.9407C9.19153 26.5294 25.7474 10 46.1588 10H330.689C351.146 10 367.721 26.6016 367.689 47.0593L366.589 733.025C366.557 753.437 350.001 769.966 329.589 769.966H45.0593C24.6016 769.966 8.02661 753.364 8.0594 732.907L9.15881 46.9407Z"
							fill={"oklch(58.97% 0 0)"}
						/>
						<Screen
							d="M15 51C15 31.1177 31.1178 15 51 15H325.342C345.224 15 361.342 31.1178 361.342 51V732.672C361.342 749.793 347.463 763.672 330.342 763.672H46C28.8792 763.672 15 749.793 15 732.672V51Z"
							fill={"white"}
						/>
					</svg>
				</Icon>
			</Phone>
		</Container>
	);
}
