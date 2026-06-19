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
import { Box } from "./Box";
import { Grid } from "./Grid";
import {
  borderRadiusOptions,
  colorOptions,
  placeContentOptions,
  spaceOptions,
} from "./storybookOptions";

const inlineCode = (value: string) => <code key={value}>{value}</code>;

const meta = {
  title: "Primitives/Grid",
  component: Grid,
  tags: ["autodocs"],
  args: {
    gap: 4,
    padding: 6,
    borderRadius: "lg",
    backgroundColor: "device",
    placeContent: "stretch",
  },
  argTypes: {
    children: {
      control: false,
    },
    gap: {
      control: "select",
      options: spaceOptions,
      description: "grid item 사이의 간격입니다.",
    },
    padding: {
      control: "select",
      options: spaceOptions,
      description: "컨테이너 내부 여백입니다.",
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
    placeContent: {
      control: "select",
      options: placeContentOptions,
      description: "grid content 정렬입니다.",
    },
    style: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`Grid`는 `Box` 위에 얇게 올라간 grid container primitive입니다. 현재는 `display="grid"`를 고정하는 의미적 래퍼에 가깝고, template 정의 같은 고급 grid 속성은 sprinkle prop으로 열려 있지 않습니다.',
      },
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

function GridItem({ label }: { label: string }) {
  return (
    <Box padding={4} backgroundColor="background" borderRadius="md">
      {label}
    </Box>
  );
}

export const Playground: Story = {
  render: (args: ComponentProps<typeof Grid>) => (
    <Grid
      {...args}
      style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
    >
      <GridItem label="셀 A" />
      <GridItem label="셀 B" />
      <GridItem label="셀 C" />
      <GridItem label="셀 D" />
    </Grid>
  ),
};

export const TemplateLayout: Story = {
  render: () => (
    <Grid
      gap={4}
      padding={5}
      backgroundColor="device"
      borderRadius="lg"
      style={{ gridTemplateColumns: "2fr 1fr" }}
    >
      <GridItem label="본문" />
      <GridItem label="보조" />
      <GridItem label="하단 좌측" />
      <GridItem label="하단 우측" />
    </Grid>
  ),
};

export const CenteredGrid: Story = {
  render: () => (
    <Grid
      placeContent="center"
      gap={3}
      padding={6}
      backgroundColor="background"
      borderRadius="lg"
      style={{ minHeight: "12rem", gridTemplateColumns: "repeat(2, 5rem)" }}
    >
      <GridItem label="1" />
      <GridItem label="2" />
      <GridItem label="3" />
      <GridItem label="4" />
    </Grid>
  ),
};

export const UsageGuidance: Story = {
  render: () => (
    <StoryDoc
      title="Grid Usage Guidance"
      lead={
        <>
          <code>Grid</code>도 구조적으로는 <code>Box</code>와 거의 같습니다.
          가장 큰 차이는 항상 <code>display="grid"</code>로 렌더된다는 점이고,
          현재 구현은 `Box`보다 아주 얇은 의미적 래퍼에 가깝습니다.
        </>
      }
    >
      <StoryDocSection title="Box와 무엇이 다른가">
        <StoryDocList
          items={[
            <>
              내부적으로는 <code>Box display="grid"</code>를 렌더합니다.
            </>,
            <>
              추가 convenience prop은 거의 없고, 대부분의 계약은{" "}
              <code>Box</code>와 동일합니다.
            </>,
            <>
              따라서 이 primitive의 핵심 가치는 기능 추가보다{" "}
              <strong>의도 표현</strong>에 있습니다.
            </>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="언제 사용하나">
        <StoryDocList
          items={[
            "wrapper가 명확하게 grid container라는 뜻을 코드에서 드러내고 싶을 때 사용합니다.",
            "2차원 배치를 만들되, spacing/color/radius는 기존 sprinkle 토큰으로 유지하고 싶을 때 적합합니다.",
            "카드 목록, 두 칼럼 레이아웃, 숫자 키패드처럼 grid가 문맥상 핵심인 경우 Box보다 읽기 쉽습니다.",
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="현재 한계">
        <StoryDocParagraph>
          현재 sprinkle 계약에는 <code>gridTemplateColumns</code>,{" "}
          <code>gridAutoFlow</code>, <code>justifyItems</code> 같은 세부 grid
          속성이 없습니다. 그래서 실제 grid template 정의는 보통{" "}
          <code>style</code> 또는 별도 CSS로 내려가야 합니다.
        </StoryDocParagraph>
        <StoryDocNote>
          즉, 오늘의 <code>Grid</code>는 “grid semantics를 가진 Box”에 더
          가깝고, full-featured grid abstraction은 아닙니다.
        </StoryDocNote>
      </StoryDocSection>

      <StoryDocSection title="주요 props">
        <StoryDocTable
          columns={["prop", "기본값", "타입", "설명"]}
          rows={[
            [inlineCode("gap"), "-", "space token", "grid item 간격입니다."],
            [
              inlineCode("placeContent"),
              "-",
              inlineCode(
                '"stretch" | "flex-start" | "center" | "flex-end" | "space-between"',
              ),
              "grid content 정렬입니다.",
            ],
            [
              inlineCode("style"),
              "-",
              "React.CSSProperties",
              "현재는 `gridTemplateColumns` 같은 실제 grid template를 여기서 자주 지정합니다.",
            ],
            [
              "Box에서 상속",
              <span key="box-inherit">-</span>,
              <span key="box-prop-group">
                {inlineCode("padding")}, {inlineCode("backgroundColor")},{" "}
                {inlineCode("borderRadius")}, {inlineCode("as")},{" "}
                {inlineCode("asChild")}
              </span>,
              "대부분의 styling/native prop은 Box와 동일합니다.",
            ],
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="언제 Flex가 더 나은가">
        <StoryDocList
          items={[
            "배치가 사실상 한 축 정렬이면 Grid보다 Flex가 단순합니다.",
            "행/열 전환과 정렬이 핵심이면 Flex의 `direction`, `alignItems`, `justifyContent`가 더 직접적입니다.",
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="예시">
        <StoryDocCode
          code={`<Grid
  gap={4}
  style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
>
  <Box>카드 A</Box>
  <Box>카드 B</Box>
</Grid>

<Grid
  placeContent="center"
  style={{ minHeight: "12rem", gridTemplateColumns: "repeat(3, 4rem)" }}
>
  <Box>1</Box>
  <Box>2</Box>
  <Box>3</Box>
</Grid>`}
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
          "Grid primitive의 사용 기준과 Box 대비 차이점을 정리한 문서형 스토리입니다.",
      },
    },
  },
};
