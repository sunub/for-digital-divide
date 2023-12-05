type Keys = {
  key: string;
  shiftKey?: string;
  id: string;
};

type Language = {
  kor: Keys[];
  eng: Keys[];
};

type KeyboardLayoutType = {
  word: Keys[] | Language;
  special: Keys[] | null;
  functionKey?: Keys;
};

const KEYBOARD_LAYOUT: KeyboardLayoutType[] = [
  {
    word: [
      { key: "`", shiftKey: "~", id: "K192" },
      { key: "1", shiftKey: "!", id: "K49" },
      { key: "2", shiftKey: "@", id: "K50" },
      { key: "3", shiftKey: "#", id: "K51" },
      { key: "4", shiftKey: "$", id: "K52" },
      { key: "5", shiftKey: "%", id: "K53" },
      { key: "6", shiftKey: "^", id: "K54" },
      { key: "7", shiftKey: "&", id: "K55" },
      { key: "8", shiftKey: "*", id: "K56" },
      { key: "9", shiftKey: "(", id: "K57" },
      { key: "0", shiftKey: ")", id: "K48" },
      { key: "-", shiftKey: "_", id: "K189" },
      { key: "=", shiftKey: "+", id: "K187" },
    ],
    special: null,
  },
  {
    word: {
      eng: [
        { key: "q", shiftKey: "Q", id: "K81" },
        { key: "w", shiftKey: "W", id: "K87" },
        { key: "e", shiftKey: "E", id: "K69" },
        { key: "r", shiftKey: "R", id: "K82" },
        { key: "t", shiftKey: "T", id: "K84" },
        { key: "y", shiftKey: "Y", id: "K89" },
        { key: "u", shiftKey: "U", id: "K85" },
        { key: "i", shiftKey: "I", id: "K73" },
        { key: "o", shiftKey: "O", id: "K79" },
        { key: "p", shiftKey: "P", id: "K80" },
      ],
      kor: [
        { key: "ㅂ", shiftKey: "ㅃ", id: "K81" },
        { key: "ㅈ", shiftKey: "ㅉ", id: "K87" },
        { key: "ㄷ", shiftKey: "ㄸ", id: "K69" },
        { key: "ㄱ", shiftKey: "ㄲ", id: "K82" },
        { key: "ㅅ", shiftKey: "ㅆ", id: "K84" },
        { key: "ㅛ", shiftKey: "ㅛ", id: "K89" },
        { key: "ㅕ", shiftKey: "ㅕ", id: "K85" },
        { key: "ㅑ", shiftKey: "ㅑ", id: "K73" },
        { key: "ㅐ", shiftKey: "ㅒ", id: "K79" },
        { key: "ㅔ", shiftKey: "ㅖ", id: "K80" },
      ],
    },
    special: [
      { key: "[", shiftKey: "{", id: "K219" },
      { key: "]", shiftKey: "}", id: "K221" },
      { key: "\\", shiftKey: "|", id: "K220" },
    ],
  },
  {
    word: {
      eng: [
        { key: "a", shiftKey: "A", id: "K81" },
        { key: "s", shiftKey: "S", id: "K87" },
        { key: "d", shiftKey: "D", id: "K69" },
        { key: "f", shiftKey: "F", id: "K82" },
        { key: "g", shiftKey: "G", id: "K84" },
        { key: "h", shiftKey: "H", id: "K89" },
        { key: "j", shiftKey: "J", id: "K85" },
        { key: "k", shiftKey: "K", id: "K73" },
        { key: "l", shiftKey: "L", id: "K79" },
      ],
      kor: [
        { key: "ㅁ", id: "K81" },
        { key: "ㄴ", id: "K87" },
        { key: "ㅇ", id: "K69" },
        { key: "ㄹ", id: "K82" },
        { key: "ㅎ", id: "K84" },
        { key: "ㅗ", id: "K89" },
        { key: "ㅓ", id: "K85" },
        { key: "ㅏ", id: "K73" },
        { key: "ㅣ", id: "K79" },
      ],
    },
    special: [
      { key: ";", shiftKey: ":", id: "K186" },
      { key: "'", shiftKey: '"', id: "K222" },
    ],
  },
  {
    word: {
      eng: [
        { key: "z", shiftKey: "Z", id: "K81" },
        { key: "x", shiftKey: "X", id: "K87" },
        { key: "c", shiftKey: "C", id: "K69" },
        { key: "v", shiftKey: "V", id: "K82" },
        { key: "b", shiftKey: "B", id: "K84" },
        { key: "n", shiftKey: "N", id: "K89" },
        { key: "m", shiftKey: "M", id: "K85" },
      ],
      kor: [
        { key: "ㅋ", id: "K81" },
        { key: "ㅌ", id: "K87" },
        { key: "ㅊ", id: "K69" },
        { key: "ㅍ", id: "K82" },
        { key: "ㅠ", id: "K84" },
        { key: "ㅜ", id: "K89" },
        { key: "ㅡ", id: "K85" },
      ],
    },
    special: [
      { key: ",", shiftKey: "<", id: "K188" },
      { key: ".", shiftKey: ">", id: "K190" },
      { key: "/", shiftKey: "?", id: "K191" },
    ],
  },
];

export default KEYBOARD_LAYOUT;
