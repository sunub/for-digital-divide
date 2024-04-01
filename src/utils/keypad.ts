export interface KeypadInfo {
  uid: string;
  keypad: KeypadDetail;
}

export interface SvgGrid {
  x: number;
  y: number;
  num: number;
}

export interface KeypadDetail {
  functionKeys: {
    symbol: string;
    rowIndex: number;
    columnIndex: number;
  }[];
  size: {
    row: number;
    columns: number;
  };
  svgGrid: SvgGrid[][];
}

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

function shuffleArray(array: number[][]): number[][] {
  const copyedArray = Array.from(array);
  const shuffledArray = [];

  const createdIndex = new Set();
  while (shuffledArray.length < copyedArray.length) {
    const randomIndex = Math.floor(Math.random() * copyedArray.length);
    if (!createdIndex.has(randomIndex)) {
      createdIndex.add(randomIndex);
      shuffledArray.push(copyedArray[randomIndex]);
    }
  }
  return shuffledArray;
}

export function getSVGGrid(): KeypadInfo {
  const shuffledNumpadAxis = shuffleArray(NUMPAD_AXIS);
  const shuffledGrid: SvgGrid[][] = [
    shuffledNumpadAxis.slice(0, 3).map(([x, y, num]) => {
      return { y, x, num };
    }),
    shuffledNumpadAxis.slice(3, 6).map(([x, y, num]) => {
      return { y, x, num };
    }),
    shuffledNumpadAxis.slice(6, 9).map(([x, y, num]) => {
      return { y, x, num };
    }),
    shuffledNumpadAxis.slice(9, 10).map(([x, y, num]) => {
      return { y, x, num };
    }),
  ];

  return {
    uid: Math.random().toString(36).substr(2, 9),
    keypad: {
      functionKeys: [
        {
          symbol: 'BLANK',
          rowIndex: Math.floor(3 / 4),
          columnIndex: 3 % 4,
        },
        {
          symbol: 'SHUFFLE',
          rowIndex: Math.floor(3 / 4),
          columnIndex: 3 % 4,
        },
      ],
      size: {
        row: 4,
        columns: 3,
      },
      svgGrid: shuffledGrid,
    },
  };
}
