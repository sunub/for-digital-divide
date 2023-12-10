import React from "react";
import styled from "styled-components";
import VkRow from "../VkRow";
import {
  DeleteKey,
  ChangeKey,
  ShiftKey,
  SpaceKey,
  CtrlAltKey,
} from "../KeyboardKeys/SpecialKeys";
import KEYBOARD_LAYOUT from "../KeyboardKeys/KeyboardKeys";

type RowConfig = {
  leftKeys: React.ReactNode | null;
  mainKeys: {
    keyLayout: any;
    isKorean: boolean;
    isShift: boolean;
    justify: string;
  };
  rightKeys: React.ReactNode | null;
};

const style: React.CSSProperties = { whiteSpace: "nowrap", userSelect: "none" };

const Wrapper = styled.div.attrs({
  style: { userSelect: "none", direction: "ltr" },
})``;

const Row = styled.div.attrs({ style: style })<{ $justify?: string }>`
  display: flex;
  justify-content: ${(props) => props.$justify};
`;

function KeyRow({
  rowConfig,
  inputRef,
}: {
  rowConfig: RowConfig;
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  const { leftKeys, mainKeys, rightKeys } = rowConfig;

  return (
    <Row $justify={mainKeys.justify}>
      {leftKeys}
      <VkRow
        keyLayout={mainKeys.keyLayout}
        isKorean={mainKeys.isKorean}
        isShift={mainKeys.isShift}
        inputRef={inputRef}
      />
      {rightKeys}
    </Row>
  );
}

function VKBoxBody({
  inputRef,
}: {
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  const [isShift, setIsShift] = React.useState(false);
  const [isKorean, setIsKorean] = React.useState(true);

  const rowConfigs: RowConfig[] = [
    {
      leftKeys: null,
      mainKeys: {
        keyLayout: KEYBOARD_LAYOUT[0],
        isKorean: isKorean,
        isShift: isShift,
        justify: "center",
      },
      rightKeys: <DeleteKey inputRef={inputRef} />,
    },
    {
      leftKeys: null,
      mainKeys: {
        keyLayout: KEYBOARD_LAYOUT[1],
        isKorean: isKorean,
        isShift: isShift,
        justify: "flex-end",
      },
      rightKeys: null,
    },
    {
      leftKeys: <ChangeKey setIsKorean={setIsKorean} />,
      mainKeys: {
        keyLayout: KEYBOARD_LAYOUT[2],
        isKorean: isKorean,
        isShift: isShift,
        justify: "flex-start",
      },
      rightKeys: null,
    },
    {
      leftKeys: <ShiftKey setIsShift={setIsShift} />,
      mainKeys: {
        keyLayout: KEYBOARD_LAYOUT[3],
        isKorean: isKorean,
        isShift: isShift,
        justify: "center",
      },
      rightKeys: <ShiftKey setIsShift={setIsShift} />,
    },
  ];

  React.useEffect(() => {
    document.getElementById("K220")?.setAttribute("style", "width: 47.5px");
  }, []);

  return (
    <Wrapper dir="ltr">
      {rowConfigs.map((rowConfig) => (
        <KeyRow
          key={crypto.randomUUID()}
          rowConfig={rowConfig}
          inputRef={inputRef}
        />
      ))}
      <Row>
        <CtrlAltKey />
        <SpaceKey inputRef={inputRef} />
        <CtrlAltKey />
      </Row>
    </Wrapper>
  );
}

export default React.memo(VKBoxBody);
