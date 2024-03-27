export function shuffleArray(array: string[]): string[] {
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
  ``;
  return shuffledArray;
}

export function getSVGGrid(shuffledArray: string[]) {
  const shuffledKey = shuffledArray.findIndex((str) =>
    str.includes('data-testid="shuffle"'),
  );
  const blankKey = shuffledArray.findIndex((str) =>
    str.includes('data-testid="blank"'),
  );

  return {
    uid: crypto.randomUUID(),
    keypad: {
      functionKeys: [
        {
          symbol: 'BLANK',
          rowIndex: Math.floor(blankKey / 4),
          columnIndex: blankKey % 4,
        },
        {
          symbol: 'SHUFFLE',
          rowIndex: Math.floor(shuffledKey / 4),
          columnIndex: shuffledKey % 4,
        },
      ],
      size: {
        row: 4,
        columns: 3,
      },
      svgGrid: [
        shuffledArray.slice(0, 3),
        shuffledArray.slice(3, 6),
        shuffledArray.slice(6, 9),
        shuffledArray.slice(9, 12),
      ],
    },
  };
}
