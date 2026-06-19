import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { Text } from "../components/Text";
import {
  StoryDoc,
  StoryDocCode,
  StoryDocList,
  StoryDocNote,
  StoryDocParagraph,
  StoryDocSection,
  StoryDocTable,
} from "../docs/StoryDoc";
import { Box } from "./Box";
import {
  borderRadiusOptions,
  colorOptions,
  displayOptions,
  positionOptions,
  spaceOptions,
} from "./storybookOptions";

const inlineCode = (value: string) => <code key={value}>{value}</code>;

const meta = {
  title: "Primitives/Box",
  component: Box,
  tags: ["autodocs"],
  args: {
    display: "block",
    padding: 6,
    paddingLeft: 6,
    borderRadius: "lg",
    backgroundColor: "device",
    color: "text",
    position: "relative",
  },
  argTypes: {
    children: {
      control: false,
    },
    display: {
      control: "select",
      options: displayOptions,
      description: "sprinkles 계약이 지원하는 display 모드입니다.",
    },
    padding: {
      control: "select",
      options: spaceOptions,
      description: "공통 space scale을 사용하는 토큰 기반 간격 값입니다.",
    },
    paddingLeft: {
      control: "select",
      options: spaceOptions,
      description:
        "개별 방향 간격 prop입니다. Box는 `paddingLeft`, `paddingTop`처럼 방향성 간격도 토큰으로 지원합니다.",
    },
    backgroundColor: {
      control: "select",
      options: colorOptions,
      description:
        "raw CSS 값이 아니라 의미 기반 색상 토큰 키를 사용합니다. 디자인 시스템 팔레트에서 선택합니다.",
    },
    color: {
      control: "select",
      options: colorOptions,
      description: "공통 색상 스케일에서 선택하는 전경색 토큰 키입니다.",
    },
    borderRadius: {
      control: "select",
      options: borderRadiusOptions,
      description:
        "공통 radius scale에서 선택하는 border radius 토큰 키입니다.",
    },
    position: {
      control: "select",
      options: positionOptions,
      description:
        "sprinkles를 통해 노출된 positioning prop입니다. 필요하면 `top`, `right`, `bottom`, `left` 토큰과 함께 조합합니다.",
    },
    style: {
      control: false,
      description:
        "토큰 계약 바깥의 값을 의도적으로 써야 할 때만 네이티브 `style`을 사용합니다.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "디자인 시스템 sprinkle prop을 정적 클래스로 바꾸는 가장 하위 레벨 프리미티브입니다. `padding`, `paddingLeft`, `gap`, `backgroundColor`, `color`, `borderRadius`, `position` 같은 공통 토큰 기반 레이아웃/시각 prop을 지원합니다. 동시에 `id`, `aria-*`, `data-*`, `onClick`, `className`, `style` 같은 일반 DOM prop도 그대로 받을 수 있습니다. 더 높은 수준의 패턴이나 의미 기반 컴포넌트가 맞지 않을 때 Box를 사용하고, raw CSS 값보다 토큰 키를 우선합니다.",
      },
    },
  },
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args: ComponentProps<typeof Box>) => (
    <Box {...args}>
      <Text variant="bodyStrong">Box 프리미티브</Text>
      <Text variant="description" color="button">
        레이아웃과 시각 토큰은 공통 sprinkles API를 통해 적용됩니다.
      </Text>
      <Text variant="description" color="button">
        Controls 패널에서 display, paddingLeft, position, backgroundColor,
        color를 바꿔보세요. 이 값들은 임의의 CSS 문자열이 아니라 토큰 기반
        prop입니다.
      </Text>
    </Box>
  ),
};

export const TokenDrivenLayout: Story = {
  render: () => (
    <Box display="grid" gap={4} style={{ maxWidth: "24rem" }}>
      <Box padding={5} backgroundColor="background" borderRadius="lg">
        <Text variant="bodyStrong">배경</Text>
      </Box>
      <Box padding={5} backgroundColor="device" borderRadius="lg">
        <Text variant="bodyStrong">디바이스</Text>
      </Box>
      <Box
        padding={5}
        backgroundColor="emphasis"
        borderRadius="lg"
        color="text"
      >
        <Text variant="bodyStrong">강조</Text>
      </Box>
    </Box>
  ),
};

export const SprinkleAndNativeProps: Story = {
  render: () => (
    <Box
      display="grid"
      gap={4}
      padding={6}
      paddingLeft={8}
      backgroundColor="device"
      borderRadius="lg"
      position="relative"
      data-story="box-native-props"
      aria-label="Box 프리미티브 예시"
      style={{ maxWidth: "28rem" }}
    >
      <Text variant="bodyStrong">Sprinkle prop + native prop 조합</Text>
      <Text variant="body" color="text">
        <code>paddingLeft</code>, <code>position</code> 같은 sprinkle prop은
        정적 클래스로 변환됩니다.
      </Text>
      <Text variant="description" color="button">
        <code>aria-label</code>, <code>data-*</code>, <code>style</code> 같은
        native prop은 그대로 DOM으로 전달됩니다.
      </Text>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "공통 스타일 계약에는 토큰 기반 sprinkle prop을 사용하고, native DOM prop은 의미 부여, 테스트 훅, 예외적인 inline style에만 남겨둡니다.",
      },
    },
  },
};

export const UsageGuidance: Story = {
  render: () => (
    <StoryDoc
      title="Box Usage Guidance"
      lead={
        <>
          <code>Box</code>는 primitive 계층의 가장 낮은 레벨입니다. 이 문서는
          데모가 아니라 어떤 prop을 전달할 수 있는지, 언제 <code>Box</code>를
          쓰고 언제 더 구체적인 primitive로 올라가야 하는지 설명하는 참고
          문서입니다.
        </>
      }
    >
      <StoryDocSection title="무엇인가">
        <StoryDocParagraph>
          <code>Box</code>는 sprinkle prop과 일반 DOM prop을 함께 받아서 하나의
          DOM element로 렌더하는 기본 wrapper입니다. <code>display</code>,{" "}
          <code>padding</code>, <code>gap</code>, <code>backgroundColor</code>,
          <code>position</code> 같은 토큰 기반 스타일은 정적 클래스로 변환되고,
          그 외 props는 native DOM 속성으로 그대로 전달됩니다.
        </StoryDocParagraph>
      </StoryDocSection>

      <StoryDocSection title="언제 사용하나">
        <StoryDocList
          items={[
            <>
              아직 <code>Flex</code>, <code>Grid</code>, 상위 컴포넌트로
              추상화할 만큼 의미가 고정되지 않은 레이아웃 wrapper가 필요하다.
            </>,
            <>
              spacing, color, radius, position 같은{" "}
              <strong>공통 토큰 기반 스타일</strong>을 빠르게 조합해야 한다.
            </>,
            <>
              <code>aria-*</code>, <code>data-*</code>, <code>id</code>,{" "}
              <code>style</code> 같은 DOM 속성을 함께 전달해야 한다.
            </>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="언제 사용하지 않나">
        <StoryDocList
          items={[
            <>
              자식을 flex로 정렬하는 목적이 명확하면 <code>Flex</code>가 더 읽기
              쉽다.
            </>,
            <>
              wrapper가 grid container 역할을 한다면 <code>Grid</code>가 더
              명확하다.
            </>,
            <>
              버튼, 링크, 카드처럼 이미 의미 기반 컴포넌트가 있으면 raw layout
              primitive보다 그 컴포넌트를 우선한다.
            </>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="전달할 수 있는 props">
        <StoryDocTable
          columns={["범주", "예시 prop", "설명"]}
          rows={[
            [
              "Layout",
              <span key="layout-props">
                {inlineCode("display")}, {inlineCode("width")},{" "}
                {inlineCode("height")},{", "}
                {inlineCode("minWidth")}, {inlineCode("maxWidth")}
              </span>,
              "sprinkles 계약에 등록된 토큰 기반 레이아웃 prop입니다.",
            ],
            [
              "Spacing",
              <span key="spacing-props">
                {inlineCode("padding")}, {inlineCode("paddingLeft")},{" "}
                {inlineCode("margin")},{", "}
                {inlineCode("gap")}
              </span>,
              "space scale을 사용하는 간격 prop입니다.",
            ],
            [
              "Visual",
              <span key="visual-props">
                {inlineCode("backgroundColor")}, {inlineCode("color")},{" "}
                {inlineCode("borderRadius")}
              </span>,
              "semantic color와 radius 토큰을 사용합니다.",
            ],
            [
              "Position",
              <span key="position-props">
                {inlineCode("position")}, {inlineCode("top")},{" "}
                {inlineCode("right")},{", "}
                {inlineCode("bottom")}, {inlineCode("left")}
              </span>,
              "토큰 기반 위치 지정 prop입니다.",
            ],
            [
              "Semantics",
              <span key="semantic-props">
                {inlineCode("as")}, {inlineCode("asChild")}
              </span>,
              "렌더 element를 바꾸거나 child slot에 스타일을 전달할 수 있습니다.",
            ],
            [
              "Native DOM",
              <span key="native-props">
                {inlineCode("id")}, {inlineCode("className")},{" "}
                {inlineCode("style")},{", "}
                {inlineCode("aria-*")}, {inlineCode("data-*")},{" "}
                {inlineCode("onClick")}
              </span>,
              "sprinkles 계약 밖의 일반 DOM prop은 그대로 전달됩니다.",
            ],
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="인터페이스">
        <StoryDocTable
          columns={["prop", "기본값", "타입", "설명"]}
          rows={[
            [
              inlineCode("as"),
              inlineCode('"div"'),
              "ElementType",
              "기본 렌더 element를 바꿉니다.",
            ],
            [
              inlineCode("asChild"),
              inlineCode("false"),
              inlineCode("boolean"),
              "true이면 child element에 Box의 className과 native prop을 전달합니다.",
            ],
            [
              inlineCode("display"),
              "-",
              inlineCode('"block" | "flex" | "grid" | "inline" | "none"'),
              "렌더 element의 display를 토큰 계약 안에서 지정합니다.",
            ],
            [
              inlineCode("padding"),
              "-",
              "space token",
              "padding 전체 값을 지정합니다. 방향별 prop과 함께 사용할 수도 있습니다.",
            ],
            [
              inlineCode("backgroundColor"),
              "-",
              "semantic color token",
              "raw CSS 값이 아니라 의미 기반 토큰 키를 사용합니다.",
            ],
            [
              inlineCode("style"),
              "-",
              "React.CSSProperties",
              "sprinkles 계약 밖의 예외적 스타일만 여기로 보냅니다.",
            ],
          ]}
        />
        <StoryDocNote>
          모든 CSS 속성이 sprinkle prop으로 열려 있지는 않습니다. 예를 들어{" "}
          <code>gridTemplateColumns</code> 같은 값은 현재 계약에 없으므로
          필요하면
          <code>style</code>이나 별도 CSS로 내려가야 합니다.
        </StoryDocNote>
      </StoryDocSection>

      <StoryDocSection title="예시">
        <StoryDocCode
          code={`<Box padding={6} backgroundColor="device" borderRadius="lg">
  콘텐츠
</Box>

<Box
  display="grid"
  gap={4}
  style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
>
  <Box padding={4} backgroundColor="background">A</Box>
  <Box padding={4} backgroundColor="background">B</Box>
</Box>

<Box
  as="section"
  aria-label="계정 요약"
  padding={6}
  backgroundColor="background"
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
          "Box primitive의 사용 기준과 props 계약을 정리한 문서형 스토리입니다.",
      },
    },
  },
};
