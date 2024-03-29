"use client";

import styled from "styled-components";

export const RootWrapper = styled.div`
  width: 376px;
  height: 779px;
  container: demo-frame / size;
`;

export const Wrapper = styled.div`
  position: relative;
  background-image: linear-gradient(rgb(219, 166, 166), rgb(0, 0, 172));
  height: 100%;
  overflow: hidden;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: calc(28cqh + 3rem);
  padding: 1rem;

  user-select: none;
  overflow-x: scroll;
  scrollbar-width: none;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
`;

export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  background-color: color-mix(in oklch, oklch(100% 0 284.14), transparent 20%);
  backdrop-filter: blur(10px);

  border-radius: 5cqw;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 8px;

  flex: 83cqw 1 0;
  /* transform: translate3d(0, 0, 0); */
  /* cursor: grab;

  &:active {
    cursor: grabbing;
  } */
`;

export const AccountNumber = styled.span``;

export const Price = styled.span`
  font-size: 2rem;
`;

export const DragProxy = styled.div`
  position: relative;
  left: calc(50% - 25px);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rebeccapurple;
`;

// const ScrollWrapper = styled.ul`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: nowrap;
//   gap: 2em;

//   width: 100%;
//   height: 100%;

//   overflow-x: scroll;
//   scrollbar-width: none;
//   scroll-behavior: smooth;
//   scroll-snap-type: x mandatory;
//   overscroll-behavior: contain;

//   animation-timeline: --carousel;
// `;

// const ItemsWrapper = styled.li`
//   display: flex;
//   justify-content: center;

//   scroll-snap-align: center;
//   width: 70dvw;
//   height: 300px;
//   flex: 100% 1 0;
// `;
