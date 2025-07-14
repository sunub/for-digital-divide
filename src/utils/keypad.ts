import crypto from 'crypto';
import { Base64 } from 'js-base64';

export interface KeypadInfo {
  uid: string;
  hashes: [string, number][];
  keypad: KeypadDetail;
}

export interface SvgGrid {
  x: number;
  y: number;
  num: string;
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

export function shuffleArray(array: number[][]): number[][] {
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

export function getSVGGrid(array: number[][]): KeypadInfo {
  const shuffledNumpadAxis = shuffleArray(array);

  const hashes = new Map();
  const hashKeys = shuffledNumpadAxis.map(([, , num]) => {
    const hash = crypto.createHash('sha256').update(num.toString()).digest();
    const encodedSignature = Base64.encode(hash.toString('binary'));
    hashes.set(encodedSignature, num);
    return encodedSignature;
  });

  const shuffledGrid: SvgGrid[][] = [
    shuffledNumpadAxis.slice(0, 3).map(([x, y], i) => {
      return {
        y,
        x,
        num: hashKeys[i],
      };
    }),
    shuffledNumpadAxis.slice(3, 6).map(([x, y], i) => {
      return {
        y,
        x,
        num: hashKeys[i + 3],
      };
    }),
    shuffledNumpadAxis.slice(6, 9).map(([x, y], i) => {
      return {
        y,
        x,
        num: hashKeys[i + 6],
      };
    }),
    shuffledNumpadAxis.slice(9, 10).map(([x, y], i) => {
      return {
        y,
        x,
        num: hashKeys[i + 9],
      };
    }),
  ];

  shuffledGrid[3].unshift({
    x: 0,
    y: -150,
    num: '100',
  });
  shuffledGrid[3].push({
    x: -80,
    y: -150,
    num: '101',
  });

  return {
    uid: Math.random().toString(36).substr(2, 9),
    hashes: Array.from(hashes),
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
