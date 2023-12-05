import styled from "styled-components";

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
};

const Key = styled.span`
  font-size: 14px;
  font-family: "NanumFont";
  font-weight: bold;
  line-height: 25px;
  user-select: none;
`;

function VKRow({
  keyLayout,
  isKorean,
  isShift,
  inputRef,
}: {
  keyLayout: KeyboardLayoutType;
  isKorean: boolean;
  isShift: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  let words = keyLayout.word;
  if (!Array.isArray(keyLayout.word)) {
    words = isKorean ? keyLayout.word["kor"] : keyLayout.word["eng"];
  }

  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!inputRef.current) return;

    const target = e.currentTarget;
    const span = target.querySelector("span");
    const btnValue = span?.textContent;

    inputRef.current.value += btnValue;
    inputRef.current.focus();
  }

  return (
    <>
      {Array.isArray(words) &&
        words.map(({ key, shiftKey, id }) => (
          <button
            key={id}
            className={"vk-btn"}
            id={id}
            type={"button"}
            onClick={(e) => handleButtonClick(e)}
          >
            <Key>{isShift && shiftKey ? shiftKey : key}</Key>
          </button>
        ))}
      {Array.isArray(keyLayout.special) &&
        keyLayout.special.map(({ key, shiftKey, id }) => (
          <button
            key={id}
            className={"vk-btn"}
            id={id}
            type={"button"}
            onClick={(e) => handleButtonClick(e)}
          >
            <Key>{isShift && shiftKey ? shiftKey : key}</Key>
          </button>
        ))}
    </>
  );
}

export default VKRow;
