"use client";

import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  background-image: url(https://picsum.photos/id/1080/6858/4574),
    linear-gradient(rgb(219, 166, 166), rgb(0, 0, 172));
  width: 100%;
  height: 100%;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;

  background-color: color-mix(in oklch, oklch(100% 0 284.14), transparent 20%);
  backdrop-filter: blur(10px);

  width: 70cqw;
  height: 25cqh;
  position: relative;
  z-index: 2;
  border-radius: 5cqw;
`;

export const test = styled.div`
  position: relative;
  position: absolute;
  top: 50px;
  z-index: 1;
`;
