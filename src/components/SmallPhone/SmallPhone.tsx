"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import useToggle from "@/hooks/use-toggle";
import { useRouter } from "next/navigation";

const Phone = styled(motion.button)`
  background: transparent;
  width: fit-content;
  height: fit-content;

  cursor: pointer;
  outline-offset: 4px;
  :focus:not(:focus-visible) {
    outline: none;
  }
`;

const Icon = styled.svg<{ $layerColors: string }>`
  border-radius: 75px;
  box-shadow:
    inset -0.5rem -0.3rem 0.1rem 0.2rem oklch(81.43% 0 0),
    inset -0.7rem -0.7rem 0.1rem 0.2rem oklch(81.43% 0 0),
    inset -1rem -1rem 0 0.4rem oklch(81.43% 0 0),
    ${(props) => props.$layerColors},
    9rem 9rem 3rem 10px oklch(32.3% 0.002 247.36),
    10rem 10rem 5rem 20px oklch(32.3% 0.002 247.36 / 0.2);
  transition: box-shadow 200ms ease-in-out;
`;

const Screen = styled.path<{ $open: boolean }>`
  filter: ${(props) => (props.$open ? "none" : "brightness(0.8)")};
  animation: ${(props) => (props.$open ? "" : "screen_brighter")} 2s infinite
    ease;

  @keyframes screen_brighter {
    0% {
      fill: oklch(37.76% 0.012 264.08 / 0.4);
      filter: brightness(1.5);
    }

    85% {
      fill: oklch(95% 0 188);
      filter: brightness(1.05);
    }

    100% {
      fill: oklch(37.76% 0.012 264.08 / 0.4);
      filter: brightness(1.5);
    }
  }
`;

function layered_shadow(layer: number, gapX: number, gapY: number): string {
  let values = "";

  for (let i = 0; i < layer; i++) {
    let colorIndex = 91 - i * 1.45;
    const color = `oklch(${colorIndex}% 0 0)`;
    let value = `${(i * gapX).toFixed(1)}rem ${(i * gapY).toFixed(
      1,
    )}rem ${color}`;
    values += `${value} ,`;
  }

  return values.slice(0, values.length - 1);
}

function SmallPhone() {
  const [isOpen, toggleOpen] = useToggle(false);
  const router = useRouter();

  return (
    <Phone
      onClick={toggleOpen}
      onAnimationComplete={(definition) => {
        if (definition === "open") {
          router.prefetch("/login");
          router.push("/login");
        }
      }}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={{
        closed: { rotateX: 66, rotateZ: 45, scale: 0.15 },
        open: { rotateX: 0, rotateZ: 0, scale: 1 },
      }}
    >
      <Icon
        width="643"
        height="1264"
        viewBox="0 0 643 1264"
        fill={"none"}
        xmlns="http://www.w3.org/2000/svg"
        $layerColors={isOpen ? "" : layered_shadow(20, 0.3, 0.3)}
      >
        <path
          d="M0 75C0 33.5787 33.5786 0 75 0H568C609.421 0 643 33.5786 643 75V1189C643 1230.42 609.421 1264 568 1264H75C33.5786 1264 0 1230.42 0 1189V75Z"
          fill="#D9D9D9"
        />
        <path
          d="M4 81C4 39.5786 37.5786 6 79 6H564C605.421 6 639 39.5786 639 81V1179C639 1220.42 605.421 1254 564 1254H79C37.5786 1254 4 1220.42 4 1179V81Z"
          fill="#ACACAC"
        />
        <path
          d="M8 89C8 47.5786 41.5786 14 83 14H560C601.421 14 635 47.5786 635 89V1171C635 1212.42 601.421 1246 560 1246H83C41.5786 1246 8 1212.42 8 1171V89Z"
          fill="black"
        />
        <Screen
          d="M27 88C27 57.6244 51.6243 33 82 33H561C591.376 33 616 57.6243 616 88V1172C616 1202.38 591.376 1227 561 1227H82C51.6243 1227 27 1202.38 27 1172V88Z"
          fill="#F7F7F7"
          $open={isOpen}
        />
        <rect x="255" y="59" width="133" height="42" rx="21" fill="black" />
      </Icon>
    </Phone>
  );
}

export default SmallPhone;
