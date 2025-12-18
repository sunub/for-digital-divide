"use server";

import { unstable_cache } from "next/cache";
import { getSVGGrid, shuffleArray } from "@/utils/keypad";

const NUMPAD_AXIS = [
  [0, 0, 2],
  [-40, 0, 0],
  [-80, 0, 1],
  [0, -50, 9],
  [-40, -50, 3],
  [-80, -50, 8],
  [0, -100, 5],
  [-40, -100, 6],
  [-80, -100, 4],
  [-40, -150, 7],
];

export const getKeypadData = unstable_cache(
  async () => {
    const shuffledArray = shuffleArray(NUMPAD_AXIS);
    const svgGrid = getSVGGrid(shuffledArray);
    return svgGrid;
  },
  ["keypad-grid-data"],
  { tags: ["keypad"] },
);
