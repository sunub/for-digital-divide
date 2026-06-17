import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
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
import { TextField } from "./TextField";

const inlineCode = (value: string) => <code key={value}>{value}</code>;

const meta = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  args: {
    placeholder: "텍스트를 입력하세요",
  },
  argTypes: {
    labelContent: {
      control: "text",
      description:
        "인풋 상단에 표시되는 라벨 텍스트입니다. 내부적으로 input의 id와 연결됩니다.",
    },
    isError: {
      control: "boolean",
      description:
        "에러 상태 여부입니다. true일 경우 테두리와 텍스트가 강조 색상으로 변경되며 aria-invalid가 설정됩니다.",
    },
    errorMessage: {
      control: "text",
      description:
        "에러 상태일 때 하단에 노출되는 메시지입니다. aria-describedby로 input과 연결됩니다.",
    },
    leftElement: {
      control: false,
      description:
        "인풋 좌측에 배치될 ReactNode입니다. 주로 아이콘을 넣습니다.",
    },
    rightElement: {
      control: false,
      description:
        "인풋 우측에 배치될 ReactNode입니다. 눈알 아이콘(비밀번호 보기), 지우기 버튼 등을 넣습니다.",
    },
    disabled: {
      control: "boolean",
      description: "비활성 상태 여부입니다.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "표준 텍스트 입력을 위한 폼 컨트롤 컴포넌트입니다. `TextField`는 라벨, 에러 메시지, 좌/우측 장식 요소를 한 번에 캡슐화하여 렌더링하며, 이들 간의 WAI-ARIA 접근성 연결(id, aria-invalid, aria-describedby)을 자동으로 처리합니다.",
      },
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args: ComponentProps<typeof TextField>) => <TextField {...args} />,
  args: {
    labelContent: "이메일",
    placeholder: "example@email.com",
  },
};

export const States: Story = {
  render: () => (
    <Flex flexDirection="column" gap={6} style={{ width: "320px" }}>
      <TextField labelContent="기본 상태" placeholder="텍스트 입력" />
      <TextField labelContent="입력된 상태" defaultValue="입력된 텍스트" />
      <TextField
        labelContent="에러 상태"
        defaultValue="잘못된 텍스트"
        isError
        errorMessage="형식에 맞지 않습니다."
      />
      <TextField labelContent="비활성 상태" placeholder="입력 불가" disabled />
    </Flex>
  ),
};

export const WithElements: Story = {
  render: () => (
    <Flex flexDirection="column" gap={6} style={{ width: "320px" }}>
      <TextField
        placeholder="검색어 입력"
        leftElement={<span style={{ padding: "0 4px" }}>🔍</span>}
      />
      <TextField
        type="password"
        placeholder="비밀번호 입력"
        rightElement={
          <button
            type="button"
            aria-label="비밀번호 보기"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            👁️
          </button>
        }
      />
      <TextField
        placeholder="금액 입력"
        leftElement={<span style={{ padding: "0 4px" }}>₩</span>}
        rightElement={
          <span style={{ padding: "0 4px", fontSize: "12px", color: "#888" }}>
            KRW
          </span>
        }
      />
    </Flex>
  ),
};

export const UsageGuidance: Story = {
  render: () => (
    <StoryDoc
      title="TextField Usage Guidance"
      lead={
        <>
          <code>TextField</code>는 텍스트 입력을 받기 위한 가장 기본적인 폼
          컨트롤입니다. 이 문서는 단순한 스타일 데모가 아니라, 폼 요소의 접근성
          보장과 올바른 상태 관리 방식을 안내하기 위한 참고 문서입니다.
        </>
      }
    >
      <StoryDocSection title="언제 사용하나">
        <StoryDocParagraph>
          단일 행(Single-line) 텍스트를 입력받아야 하는 폼 렌더링 시 기본적으로
          사용합니다.
        </StoryDocParagraph>
        <StoryDocList
          items={[
            <>이메일, 비밀번호, 이름 등 일반적인 사용자 정보 입력</>,
            <>
              단순한 <code>&lt;input&gt;</code> 외에{" "}
              <strong>라벨과 에러 메시지를 세트</strong>로 묶어 렌더링해야 할 때
            </>,
            <>
              입력 필드 내부에 아이콘이나 부가적인 액션 버튼(ex: 지우기,
              비밀번호 보기)이 필요할 때
            </>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="언제 사용하지 않나">
        <StoryDocList
          items={[
            <>
              여러 줄의 긴 텍스트 입력이 필요할 때는 <code>Textarea</code>를
              사용합니다.
            </>,
            <>
              미리 정의된 옵션 중 하나를 선택해야 할 때는 <code>Select</code>{" "}
              또는 <code>Dropdown</code> 패턴이 적합합니다.
            </>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="접근성">
        <StoryDocParagraph>
          <code>TextField</code>는 시각적인 그룹화뿐만 아니라 스크린 리더 등
          보조 기술을 위한 구조적 연결을 자동으로 처리합니다.
        </StoryDocParagraph>
        <StoryDocTable
          columns={["항목", "기본 제공", "설명"]}
          rows={[
            [
              inlineCode("labelContent"),
              "라벨-인풋 연결",
              "내부적으로 고유 id를 생성하여 label의 htmlFor와 input의 id를 연결합니다.",
            ],
            [
              inlineCode("isError"),
              inlineCode('aria-invalid="true"'),
              "에러 상태일 때 aria-invalid 속성을 주입하여 보조 기술이 입력 오류를 인지하게 합니다.",
            ],
            [
              inlineCode("errorMessage"),
              inlineCode("aria-describedby"),
              "에러 메시지 DOM에 id를 부여하고 input의 aria-describedby와 연결하여, 포커스 시 에러 원인을 읽을 수 있게 합니다.",
            ],
          ]}
        />
        <StoryDocNote>
          <code>leftElement</code>나 <code>rightElement</code>에 상호작용 가능한
          요소(예: 버튼)를 넣을 경우, 해당 요소에 대한 접근성(
          <code>aria-label</code> 등)은 개발자가 직접 챙겨야 합니다.
        </StoryDocNote>
      </StoryDocSection>

      <StoryDocSection title="인터페이스">
        <StoryDocTable
          columns={["prop", "기본값", "타입", "설명"]}
          rows={[
            [
              inlineCode("labelContent"),
              inlineCode("undefined"),
              inlineCode("string"),
              "인풋 필드 상단에 렌더링될 라벨 텍스트입니다.",
            ],
            [
              inlineCode("isError"),
              inlineCode("false"),
              inlineCode("boolean"),
              "유효성 검사 실패 시 true로 설정합니다. 테두리 색상과 텍스트 색상이 변경됩니다.",
            ],
            [
              inlineCode("errorMessage"),
              inlineCode("undefined"),
              inlineCode("string"),
              "isError가 true일 때 하단에 표시될 에러 메시지입니다.",
            ],
            [
              inlineCode("leftElement"),
              inlineCode("undefined"),
              inlineCode("ReactNode"),
              "입력 영역 좌측에 배치할 아이콘 등의 요소입니다.",
            ],
            [
              inlineCode("rightElement"),
              inlineCode("undefined"),
              inlineCode("ReactNode"),
              "입력 영역 우측에 배치할 액션 버튼 등의 요소입니다.",
            ],
            [
              <span key="input-props">
                {inlineCode("placeholder")}, {inlineCode("type")}, ...
              </span>,
              "-",
              "ComponentProps<'input'>",
              "기본 input 요소가 받는 모든 속성을 그대로 지원합니다.",
            ],
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="예시">
        <StoryDocCode
          code={`<TextField
  type="email"
  labelContent="이메일"
  placeholder="example@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<TextField
  type="password"
  labelContent="비밀번호"
  isError={passwordError !== null}
  errorMessage={passwordError}
  rightElement={
    <button aria-label="비밀번호 표시 토글" onClick={togglePassword}>
      <Icon name={showPassword ? "eye-off" : "eye"} />
    </button>
  }
/>`}
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
          "실제 구현 계약에 맞춘 TextField 사용 문서입니다. 폼 상태 관리 및 접근성 구조화에 대한 가이드를 제공합니다.",
      },
    },
  },
};
