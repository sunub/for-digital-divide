import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import {
  StoryDoc,
  StoryDocCode,
  StoryDocList,
  StoryDocNote,
  StoryDocSection,
  StoryDocTable,
} from "../docs/StoryDoc";
import { Box } from "./Box";
import { Flex } from "./Flex";
import {
  alignOptions,
  borderRadiusOptions,
  colorOptions,
  directionOptions,
  flexWrapOptions,
  spaceOptions,
} from "./storybookOptions";

const inlineCode = (value: string) => <code key={value}>{value}</code>;

const meta = {
  title: "Primitives/Flex",
  component: Flex,
  tags: ["autodocs"],
  args: {
    direction: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    padding: 6,
    borderRadius: "lg",
    backgroundColor: "device",
  },
  argTypes: {
    children: {
      control: false,
    },
    direction: {
      control: "select",
      options: directionOptions,
      description:
        "Flex 전용 편의 prop으로, 내부에서 `flexDirection`으로 매핑됩니다.",
    },
    gap: {
      control: "select",
      options: spaceOptions,
      description: "자식 간 간격을 space token으로 지정합니다.",
    },
    alignItems: {
      control: "select",
      options: alignOptions,
      description: "교차 축 정렬입니다.",
    },
    justifyContent: {
      control: "select",
      options: alignOptions,
      description: "주 축 정렬입니다.",
    },
    flexWrap: {
      control: "select",
      options: flexWrapOptions,
      description: "줄바꿈 동작입니다. 기본값은 `nowrap`입니다.",
    },
    padding: {
      control: "select",
      options: spaceOptions,
      description: "컨테이너 안쪽 여백입니다.",
    },
    backgroundColor: {
      control: "select",
      options: colorOptions,
      description: "semantic color token을 사용합니다.",
    },
    borderRadius: {
      control: "select",
      options: borderRadiusOptions,
      description: "radius token입니다.",
    },
    style: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`Flex`는 `Box` 위에 얇게 올라간 레이아웃 primitive입니다. `display="flex"`를 고정하고, `direction`을 `flexDirection`으로 매핑하며, 나머지 sprinkle prop과 native DOM prop은 `Box`와 동일하게 전달합니다.',
      },
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;

type Story = StoryObj<typeof meta>;

function FlexItem({ label }: { label: string }) {
  return (
    <Box padding={4} backgroundColor="background" borderRadius="md">
      {label}
    </Box>
  );
}

export const Playground: Story = {
  render: (args: ComponentProps<typeof Flex>) => (
    <Flex {...args}>
      <FlexItem label="항목 A" />
      <FlexItem label="항목 B" />
      <FlexItem label="항목 C" />
    </Flex>
  ),
};

export const DirectionAndAlignment: Story = {
  render: () => (
    <Box display="grid" gap={4}>
      <Flex
        direction="row"
        gap={4}
        alignItems="center"
        justifyContent="space-between"
        padding={5}
        backgroundColor="device"
        borderRadius="lg"
      >
        <FlexItem label="row" />
        <FlexItem label="space-between" />
        <FlexItem label="center" />
      </Flex>
      <Flex
        direction="column"
        gap={3}
        alignItems="flex-start"
        padding={5}
        backgroundColor="background"
        borderRadius="lg"
      >
        <FlexItem label="column" />
        <FlexItem label="stacked" />
        <FlexItem label="items" />
      </Flex>
    </Box>
  ),
};

export const WrapBehavior: Story = {
  render: () => (
    <Flex
      gap={3}
      flexWrap="wrap"
      padding={5}
      backgroundColor="device"
      borderRadius="lg"
      style={{ maxWidth: "18rem" }}
    >
      <FlexItem label="하나" />
      <FlexItem label="둘" />
      <FlexItem label="셋" />
      <FlexItem label="넷" />
      <FlexItem label="다섯" />
    </Flex>
  ),
};

export const UsageGuidance: Story = {
  render: () => (
    <StoryDoc
      title="Flex Usage Guidance"
      lead={
        <>
          <code>Flex</code>는 구조적으로 <code>Box</code>와 거의 같습니다.
          차이는 `display`를 직접 넘기지 않아도 항상 <code>flex</code>{" "}
          container로 렌더된다는 점과, <code>direction</code> 편의 prop을
          제공한다는 점입니다.
        </>
      }
    >
      <StoryDocSection title="Box와 무엇이 다른가">
        <StoryDocList
          items={[
            <>
              내부적으로는 <code>Box display="flex"</code>를 렌더합니다.
            </>,
            <>
              <code>direction</code> prop을 받아 <code>flexDirection</code>으로
              매핑합니다.
            </>,
            <>
              <code>flexWrap</code> 기본값을 <code>"nowrap"</code>으로
              지정합니다.
            </>,
            <>
              그 외 sprinkle prop과 native DOM prop 계약은 <code>Box</code>와
              같습니다.
            </>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="언제 사용하나">
        <StoryDocList
          items={[
            "자식을 한 축으로 정렬하는 wrapper가 필요할 때 사용합니다.",
            "행/열 방향 전환이 코드에서 바로 읽혀야 할 때 `Box`보다 적합합니다.",
            '정렬 목적이 분명한 UI에서는 `display="flex"`를 직접 적는 것보다 `Flex`가 더 의도가 명확합니다.',
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="언제 Box로 충분한가">
        <StoryDocList
          items={[
            <>
              flex 여부가 문맥상 중요하지 않고 단순 wrapper면 <code>Box</code>도
              충분합니다.
            </>,
            <>
              grid template 같은 2차원 배치가 핵심이면 <code>Grid</code> 또는
              별도 CSS가 더 맞습니다.
            </>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="주요 props">
        <StoryDocTable
          columns={["prop", "기본값", "타입", "설명"]}
          rows={[
            [
              inlineCode("direction"),
              inlineCode('"row"'),
              inlineCode('"row" | "column"'),
              "Flex 전용 편의 prop입니다. 내부에서 `flexDirection`으로 변환됩니다.",
            ],
            [
              inlineCode("alignItems"),
              "-",
              inlineCode(
                '"stretch" | "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly"',
              ),
              "교차 축 정렬입니다.",
            ],
            [
              inlineCode("justifyContent"),
              "-",
              inlineCode(
                '"stretch" | "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly"',
              ),
              "주 축 정렬입니다.",
            ],
            [
              inlineCode("flexWrap"),
              inlineCode('"nowrap"'),
              inlineCode('"nowrap" | "wrap" | "wrap-reverse"'),
              "줄바꿈 동작입니다.",
            ],
            [
              "Box에서 상속",
              <span key="box-inherit">-</span>,
              <span key="box-prop-group">
                {inlineCode("padding")}, {inlineCode("gap")},{" "}
                {inlineCode("color")}, {inlineCode("backgroundColor")},{" "}
                {inlineCode("as")}, {inlineCode("asChild")}
              </span>,
              "대부분의 styling/native prop은 Box와 동일합니다.",
            ],
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="주의할 점">
        <StoryDocNote>
          <code>direction</code>은 convenience prop일 뿐입니다. 이미 공통
          레이아웃 wrapper나 recipe에서 방향이 고정되어 있다면 `Flex`를 중첩해서
          의미를 흐리기보다 더 높은 수준 컴포넌트로 올리는 편이 낫습니다.
        </StoryDocNote>
      </StoryDocSection>

      <StoryDocSection title="예시">
        <StoryDocCode
          code={`<Flex direction="column" gap={4}>
  <Box>헤더</Box>
  <Box>본문</Box>
</Flex>

<Flex
  justifyContent="space-between"
  alignItems="center"
  padding={5}
>
  <Box>좌측</Box>
  <Box>우측</Box>
</Flex>

<Flex flexWrap="wrap" gap={3} style={{ maxWidth: "18rem" }}>
  <Box>Tag 1</Box>
  <Box>Tag 2</Box>
  <Box>Tag 3</Box>
</Flex>`}
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
          "Flex primitive의 사용 기준과 Box 대비 차이점을 정리한 문서형 스토리입니다.",
      },
    },
  },
};
