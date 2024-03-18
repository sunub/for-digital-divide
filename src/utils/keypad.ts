import { SVG_HTMLS } from '@/constants/constants';
import { v4 as uuidv4 } from 'uuid';

/** 키패드 데이터 생성 API
 * 요청과 응답 타입은 함수의 입출력 타입을 확인해주세요. */
// export function createKeypad() {
//   return http.post('/api/keypad');
// }

type KeypadInputResult = {
  uid: string;
  coords: Array<{ x: number; y: number }>;
};

/** 비밀번호 제출 API
 * 요청과 응답 타입은 함수의 입출력 타입을 확인해주세요. */
// export function submitPassword(
//   password: KeypadInputResult,
//   confirmPassword: KeypadInputResult,
// ) {
//   return http.post('/api/password', { password, confirmPassword });
// }

export interface CreateKeypad {
  uid: string;
  keypad: {
    functionKeys: Array<{
      symbol: string;
      rowIndex: number;
      columnIndex: number;
    }>;
    size: {
      rows: number;
      columns: number;
    };
    svgGrid: string[][];
  };
}

interface Keypad {
  functionKeys: FunctionKey[];
  size: {
    rows: number;
    columns: number;
  };
  svgGrid: string[][];
}

interface CreateKeypadResponse {
  uid: string;
  keypad: Keypad;
}

export function shuffle(array: string[]) {
  let currIndex = array.length;
  let randomIndex: number;
  const newArray = Array.from(array);

  while (currIndex !== 0) {
    randomIndex = Math.floor(currIndex * Math.random());
    currIndex -= 1;

    [newArray[currIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currIndex],
    ];
  }

  return newArray;
}

export function createKeypadResponse(): CreateKeypadResponse {
  const shuffledSvgHtmls = shuffle(SVG_HTMLS);
  const blankIndex = shuffledSvgHtmls.findIndex((svgHtml) =>
    svgHtml.includes('data-testid="blank"'),
  );
  const shuffleIndex = shuffledSvgHtmls.findIndex((svgHtml) =>
    svgHtml.includes('data-testid="shuffle"'),
  );

  return {
    uid: uuidv4(),
    keypad: {
      functionKeys: [
        {
          symbol: 'BLANK',
          rowIndex: Math.floor(blankIndex / 4),
          columnIndex: blankIndex % 4,
        },
        {
          symbol: 'SHUFFLE',
          rowIndex: Math.floor(shuffleIndex / 4),
          columnIndex: shuffleIndex % 4,
        },
      ],
      size: {
        rows: 4,
        columns: 3,
      },
      svgGrid: [
        shuffledSvgHtmls.slice(0, 3),
        shuffledSvgHtmls.slice(3, 6),
        shuffledSvgHtmls.slice(6, 9),
        shuffledSvgHtmls.slice(9, 12),
      ],
    },
  };
}
