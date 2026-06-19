import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  StoryDoc,
  StoryDocCode,
  StoryDocList,
  StoryDocNote,
  StoryDocParagraph,
  StoryDocSection,
  StoryDocTable,
} from "../../docs/StoryDoc";
import { Flex } from "../../primitives/Flex";
import { Tooltip } from "./index";

const inlineCode = (value: string) => <code key={value}>{value}</code>;

const meta = {
  title: "Components/Tooltip",
  component: Tooltip.Provider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "아이템에 마우스를 올렸을 때 부가적인 설명을 제공하는 툴팁 컴포넌트입니다. `Provider`, `Trigger`, `Content`의 Compound Component 패턴으로 구성되며, Portal을 사용하여 렌더링됩니다.",
      },
    },
  },
} satisfies Meta<typeof Tooltip.Provider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <Flex style={{ padding: "100px", justifyContent: "center" }}>
      <Tooltip.Provider>
        <Tooltip.Trigger variant="default" size="default">
          마우스를 올려보세요
        </Tooltip.Trigger>
        <Tooltip.Content>이것은 툴팁 부가 설명입니다.</Tooltip.Content>
      </Tooltip.Provider>
    </Flex>
  ),
};

export const UsageGuidance: Story = {
  render: () => (
    <StoryDoc
      title="Tooltip Usage Guidance"
      lead={
        <>
          <code>Tooltip</code>은 화면을 복잡하게 만들지 않으면서 부가적인
          설명이나 단축키 정보 등을 제공할 때 사용하는 컴포넌트입니다. Compound
          Component 패턴을 통해 트리거와 컨텐츠를 유연하게 구성할 수 있습니다.
        </>
      }
    >
      <StoryDocSection title="언제 사용하나">
        <StoryDocParagraph>
          화면 공간을 절약하면서, 사용자가 원할 때만(Hover) 힌트를 주고 싶을 때
          사용합니다.
        </StoryDocParagraph>
        <StoryDocList
          items={[
            <>
              아이콘만 있는 버튼(Icon Button)의{" "}
              <strong>목적이나 액션의 이름</strong>을 설명해야 할 때
            </>,
            <>
              공간 제약으로 텍스트가 말줄임(Truncation) 처리되었을 때,{" "}
              <strong>전체 텍스트</strong>를 보여주기 위해
            </>,
            <>
              특정 전문 용어나 UI 요소에 대한 <strong>가벼운 보충 설명</strong>
              이 필요할 때
            </>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="언제 사용하지 않나">
        <StoryDocList
          items={[
            <>
              <strong>필수적인 정보(에러 메시지, 폼 양식 조건 등):</strong>{" "}
              사용자가 반드시 알아야 하는 정보는 툴팁이 아닌 화면 내 인라인
              텍스트로 노출해야 합니다.
            </>,
            <>
              <strong>모바일 최우선 환경:</strong> 터치 디바이스에서는 Hover
              동작이 존재하지 않습니다. 모바일 대응이 필요하다면 모달이나 바텀
              시트, 인라인 확장을 고려하세요.
            </>,
            <>
              <strong>복잡한 상호작용:</strong> 툴팁 내부에 폼, 버튼, 링크 등
              상호작용 가능한 요소를 넣지 마세요. 그럴 때는 <code>Popover</code>
              나 <code>Dialog</code>를 사용해야 합니다.
            </>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="구조와 컴포넌트">
        <StoryDocParagraph>
          툴팁은 세 가지 하위 컴포넌트의 조합으로 동작합니다.
        </StoryDocParagraph>
        <StoryDocTable
          columns={["컴포넌트", "역할", "설명"]}
          rows={[
            [
              inlineCode("Tooltip.Provider"),
              "상태 관리 및 컨텍스트",
              "Tooltip의 열림/닫힘 상태를 하위 컴포넌트에 공유하는 로컬 래퍼입니다. 전체 페이지가 아닌 개별 툴팁 단위로 1:1로 감싸야 합니다.",
            ],
            [
              inlineCode("Tooltip.Trigger"),
              "이벤트 발생 (버튼)",
              "마우스를 올리거나 포커스 했을 때 이벤트를 감지하는 트리거입니다. 내부적으로 Button 컴포넌트를 사용합니다.",
            ],
            [
              inlineCode("Tooltip.Content"),
              "내용 렌더링",
              "Portal을 통해 document.body에 직접 렌더링되는 실제 툴팁 박스입니다. fixed 포지셔닝을 사용하여 부모나 스크롤에 영향을 받지 않고 뷰포트 기준으로 안전하게 배치됩니다.",
            ],
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="주의사항 (Anti-Pattern)">
        <StoryDocParagraph>
          <code>Tooltip.Provider</code>는 전체 화면이나 레이아웃 컴포넌트를
          전역으로 감싸기 위해 고안된 컨텍스트가 아닙니다. 전역으로 감쌀 경우
          여러 개의 툴팁 상태가 충돌하게 되므로, 반드시{" "}
          <strong>개별 Tooltip 단위로 컴포넌트를 감싸는 컴포지션 방식</strong>
          으로 사용해야 합니다.
        </StoryDocParagraph>
      </StoryDocSection>

      <StoryDocSection title="접근성 (A11y)">
        <StoryDocParagraph>
          툴팁은 시각적 보조 수단이므로, 스크린 리더 사용자에게도 동일한 정보가
          전달되어야 합니다.
        </StoryDocParagraph>
        <StoryDocNote>
          현재 구현체에서는 접근성 속성(<code>aria-describedby</code>,{" "}
          <code>role="tooltip"</code>)이 자동으로 연결되지 않습니다. 따라서
          트리거가 되는 버튼 자체의 의미가 불분명할 경우(예: 아이콘 버튼),
          반드시 <code>Tooltip.Trigger</code>에 <code>aria-label</code>을 직접
          제공하여 스크린 리더가 버튼의 목적을 읽을 수 있도록 해야 합니다.
        </StoryDocNote>
      </StoryDocSection>

      <StoryDocSection title="예시">
        <StoryDocCode
          code={`import { Tooltip } from "@packages/design-system";

function IconOnlyButton() {
  return (
    <Tooltip.Provider>
      {/* 트리거 버튼이 아이콘만 있으므로 스크린 리더를 위한 aria-label을 직접 부여합니다. */}
      <Tooltip.Trigger aria-label="설정 메뉴 열기" size="icon">
        <SettingsIcon />
      </Tooltip.Trigger>
      
      <Tooltip.Content>설정</Tooltip.Content>
    </Tooltip.Provider>
  );
}`}
        />
      </StoryDocSection>
    </StoryDoc>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      canvas: {
        sourceState: "hidden" as const,
      },
      description: {
        story:
          "실제 구현 계약에 맞춘 Tooltip 사용 문서입니다. Compound Component 사용법과 안티 패턴에 대한 가이드를 제공합니다.",
      },
    },
  },
};
