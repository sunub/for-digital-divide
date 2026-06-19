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
} from "../docs/StoryDoc";
import { Flex } from "../primitives/Flex";
import { Button } from "./Button";

const variantOptions = [
  "default",
  "primary",
  "transparent",
  "destructive",
] as const;

const sizeOptions = ["sm", "default", "lg", "pill", "icon", "wide"] as const;

const fontOptions = ["default", "xs", "sm", "lg", "xl", "xxl", "xxxl"] as const;
const statusOptions = ["idle", "pending"] as const;
const inlineCode = (value: string) => <code key={value}>{value}</code>;

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "계속하기",
    variant: "default",
    size: "default",
    font: "default",
  },
  argTypes: {
    asChild: {
      control: false,
      description:
        "버튼 스타일을 링크 같은 다른 interactive element에 전달해야 할 때만 `asChild`를 사용합니다.",
    },
    variant: {
      control: "select",
      options: variantOptions,
      description: "공통 액션 버튼의 의미 기반 시각 톤입니다.",
    },
    size: {
      control: "select",
      options: sizeOptions,
      description: "토큰 기반 버튼 크기 규약입니다.",
    },
    font: {
      control: "select",
      options: fontOptions,
      description: "현재 버튼 recipe가 노출하는 타이포그래피 크기입니다.",
    },
    disabled: {
      control: "boolean",
      description:
        "네이티브 버튼의 비활성 상태입니다. 일시적으로 상호작용을 막아야 할 때 사용합니다.",
    },
    status: {
      control: "select",
      options: statusOptions,
      description:
        "공통 상호작용 상태입니다. `pending`이면 버튼이 비활성화되고 기본 라벨 대신 내장 pending 애니메이션이 표시됩니다.",
    },
    style: {
      control: false,
    },
    onClick: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "표준 제품 버튼을 위한 공통 액션 컴포넌트입니다. `Button`은 `type`, `disabled`, `aria-*` 같은 네이티브 버튼 의미와 가벼운 `pending` 상태를 함께 책임집니다. 링크 같은 다른 interactive element에 버튼 스타일을 입혀야 할 때만 `asChild`를 사용합니다.",
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args: ComponentProps<typeof Button>) => <Button {...args} />,
};

export const Variants: Story = {
  render: () => (
    <Flex gap={4} flexWrap="wrap">
      <Button variant="default">기본</Button>
      <Button variant="primary">강조</Button>
      <Button variant="transparent">투명</Button>
      <Button variant="destructive">삭제</Button>
    </Flex>
  ),
};

export const InteractionStates: Story = {
  render: () => (
    <Flex gap={4} flexWrap="wrap" alignItems="center">
      <Button>기본</Button>
      <Button disabled>비활성</Button>
      <Button status="pending">저장 중</Button>
      <Button variant="destructive" disabled>
        비활성 삭제
      </Button>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '공통 pending 처리가 필요하면 `status="pending"`를 사용합니다. 더 강한 제품 수준의 모션과 개성 있는 셸이 필요할 때만 `ThreeDButton`으로 넘어갑니다.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <Flex gap={4} flexWrap="wrap" alignItems="center">
      <Button size="sm">작게</Button>
      <Button size="default">기본</Button>
      <Button size="lg">크게</Button>
      <Button size="pill">필</Button>
      <Button size="icon" aria-label="Settings">
        +
      </Button>
    </Flex>
  ),
};

export const AsChildAnchor: Story = {
  render: () => (
    <Button asChild variant="transparent">
      <a href="#storybook-preview-wrapper">탐색용 버튼 스타일 링크</a>
    </Button>
  ),
};

export const UsageGuidance: Story = {
  render: () => (
    <StoryDoc
      title="Button Usage Guidance"
      lead={
        <>
          <code>Button</code>은 표준 제품 액션을 위한 기본 버튼입니다. 이 문서는
          데모가 아니라 실제 사용 판단에 필요한 기준, 접근성 책임, props 계약을
          빠르게 확인하기 위한 참고 문서입니다.
        </>
      }
    >
      <StoryDocSection title="언제 사용하나">
        <StoryDocParagraph>
          다음 조건이 맞으면 먼저 <code>Button</code>을 검토합니다.
        </StoryDocParagraph>
        <StoryDocList
          items={[
            <>
              제출, 저장, 취소, 삭제 확인처럼{" "}
              <strong>예측 가능한 표준 액션</strong>
              이다.
            </>,
            <>
              네이티브 <code>button</code> 의미, <code>type</code>,{" "}
              <code>disabled</code>, <code>aria-*</code>를 그대로 가져가야 한다.
            </>,
            <>
              <code>status="pending"</code> 정도의{" "}
              <strong>가벼운 진행 상태</strong>면 충분하다.
            </>,
            <>
              링크를 버튼처럼 보여야 하지만 핵심 의미가 여전히{" "}
              <strong>탐색</strong>인 경우 <code>asChild</code>로 앵커를 감싼다.
            </>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="언제 사용하지 않나">
        <StoryDocList
          items={[
            <>
              버튼 셸과 모션 자체가 제품의 표현 언어여야 하면{" "}
              <code>ThreeDButton</code>이 더 맞다.
            </>,
            <>
              인라인 텍스트 탐색이면 버튼이 아니라 <code>AppLink</code>를 쓴다.
            </>,
            <>
              복잡한 상태 전환을 버튼 자체가 강하게 드러내야 하면 현재{" "}
              <code>Button</code>보다 별도 패턴이 낫다.
            </>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="접근성">
        <StoryDocParagraph>
          <code>Button</code>은 기본적으로 다음 접근성 계약을 제공합니다.
        </StoryDocParagraph>
        <StoryDocTable
          columns={["항목", "기본 제공", "설명"]}
          rows={[
            [
              inlineCode("button"),
              "버튼 의미와 키보드 상호작용",
              "기본 렌더는 네이티브 button이라서 스크린 리더와 키보드 사용자가 버튼으로 인식합니다.",
            ],
            [
              inlineCode("disabled"),
              "비활성 상태 전달",
              "native button에서는 disabled가 그대로 전달되어 상호작용이 차단되고 보조 기술에도 비활성 상태가 노출됩니다.",
            ],
            [
              inlineCode('status="pending"'),
              <span key="pending-contract">
                {inlineCode("disabled")} + {inlineCode("aria-busy")}
              </span>,
              "pending이면 기본 라벨 대신 내장 애니메이션이 보이고, 클릭이 막히며 aria-busy가 설정됩니다.",
            ],
            [
              inlineCode("type"),
              "폼 의미 유지",
              "submit/reset/button 의미를 그대로 사용할 수 있습니다.",
            ],
            [
              inlineCode("asChild"),
              "스타일만 전달",
              "자식 element의 실제 의미는 자식이 결정합니다. anchor를 넘기면 링크 의미를 유지하고, 비상호작용 element를 넘기면 접근성도 그만큼 나빠집니다.",
            ],
          ]}
        />
        <StoryDocNote>
          아이콘만 있는 버튼은 컴포넌트가 목적을 추론해주지 않습니다. 이 경우
          개발자가 직접 <code>aria-label</code>을 넣어야 합니다.
        </StoryDocNote>
      </StoryDocSection>

      <StoryDocSection title="추가로 개발자가 책임져야 하는 것">
        <StoryDocList
          items={[
            <>
              아이콘 버튼이나 축약 라벨에는 <code>aria-label</code>을 추가한다.
            </>,
            <>
              폼 제출 버튼이면 <code>type="submit"</code>을 명시한다.
            </>,
            <>
              링크 성격의 액션이면 <code>asChild</code>와 실제{" "}
              <code>&lt;a&gt;</code>를 함께 사용하고 <code>href</code>를
              빠뜨리지 않는다.
            </>,
            <>
              <code>asChild</code>로 <code>div</code> 같은 비상호작용 element를
              넘기지 않는다.
            </>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="인터페이스">
        <StoryDocTable
          columns={["prop", "기본값", "타입", "설명"]}
          rows={[
            [
              inlineCode("variant"),
              inlineCode('"default"'),
              inlineCode(
                '"default" | "primary" | "transparent" | "destructive"',
              ),
              "버튼의 의미 기반 시각 톤입니다.",
            ],
            [
              inlineCode("size"),
              inlineCode('"default"'),
              inlineCode('"sm" | "default" | "lg" | "pill" | "icon" | "wide"'),
              "토큰 기반 크기 규약입니다.",
            ],
            [
              inlineCode("font"),
              inlineCode('"default"'),
              inlineCode(
                '"default" | "xs" | "sm" | "lg" | "xl" | "xxl" | "xxxl"',
              ),
              "버튼 recipe가 노출하는 텍스트 크기입니다.",
            ],
            [
              inlineCode("status"),
              inlineCode('"idle"'),
              inlineCode('"idle" | "pending"'),
              "pending이면 버튼이 비활성화되고 aria-busy가 설정되며 라벨 대신 내장 애니메이션이 보입니다.",
            ],
            [
              inlineCode("asChild"),
              inlineCode("false"),
              inlineCode("boolean"),
              "true이면 자식 element에 버튼 스타일만 전달합니다.",
            ],
            [
              inlineCode("disabled"),
              inlineCode("false"),
              inlineCode("boolean"),
              "native button일 때 비활성화 여부를 제어합니다.",
            ],
            [
              inlineCode("type"),
              inlineCode('"button"'),
              inlineCode('"button" | "submit" | "reset"'),
              "native button의 기본 동작을 지정합니다.",
            ],
            [
              <span key="dom-props">
                {inlineCode("aria-*")}, {inlineCode("data-*")},{" "}
                {inlineCode("onClick")}
              </span>,
              "-",
              "DOM props",
              "일반 DOM 속성은 native button 또는 slottable child에 그대로 전달됩니다.",
            ],
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="예시">
        <StoryDocCode
          code={`<Button type="submit" status={isPending ? "pending" : "idle"}>
  저장하기
</Button>

<Button variant="destructive" onClick={handleDelete}>
  삭제
</Button>

<Button size="icon" aria-label="설정 열기">
  <SettingsIcon />
</Button>

<Button asChild variant="transparent">
  <a href="/help">도움말 보기</a>
</Button>`}
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
          "실제 구현 계약에 맞춘 Button 사용 문서입니다. Canvas 데모보다 읽기 중심으로 구성되어 있으며, 접근성 책임과 props 선택 기준을 정리합니다.",
      },
    },
  },
};
