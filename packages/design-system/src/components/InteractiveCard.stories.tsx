import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps, CSSProperties } from "react";
import {
  StoryDoc,
  StoryDocCode,
  StoryDocList,
  StoryDocNote,
  StoryDocParagraph,
  StoryDocSection,
  StoryDocTable,
} from "../docs/StoryDoc";
import { Box } from "../primitives/Box";
import { Flex } from "../primitives/Flex";
import { vars } from "../tokens/theme.css";
import { Button } from "./Button";
import { InteractiveCard } from "./InteractiveCard";
import { Text } from "./Text";

const inlineCode = (value: string) => <code key={value}>{value}</code>;

const dashboardBackdropStyle = {
  width: "100%",
  minHeight: "32rem",
  padding: "2.5rem 1.5rem",
  borderRadius: "2rem",
  background:
    "linear-gradient(180deg, color-mix(in oklch, var(--color-device) 82%, white) 0%, color-mix(in oklch, var(--color-background) 74%, var(--color-emphasis)) 100%)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.75), 0 24px 60px rgba(53, 34, 77, 0.12)",
} satisfies CSSProperties;

const previewCardStyle = {
  width: "100%",
  maxWidth: "23rem",
  margin: "0 auto",
  minHeight: "18rem",
} satisfies CSSProperties;

const cardBodyStyle = { minHeight: "18rem" } satisfies CSSProperties;

const meta = {
  title: "Components/InteractiveCard",
  component: InteractiveCard,
  tags: ["autodocs"],
  args: {
    children: null,
    hoverHint: "커서를 올려 스포트라이트를 확인해보세요",
  },
  argTypes: {
    hoverHint: {
      control: "text",
      description:
        "카드 하단에 표시되는 hover 안내 문구입니다. spotlight affordance를 설명해야 할 때만 사용합니다.",
    },
    contentClassName: {
      control: false,
      description:
        "카드 내부 콘텐츠 wrapper에 class를 추가합니다. 내부 padding 이후의 레이아웃을 조정해야 할 때 사용합니다.",
    },
    className: {
      control: false,
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
          "카드 자체가 상호작용 affordance의 일부일 때 사용하는 interactive surface입니다. 글래스 셸, spotlight, hover hint를 함께 제공하며, 내부 content wrapper를 통해 카드형 레이아웃의 기본 padding과 폭도 같이 책임집니다.",
      },
    },
  },
} satisfies Meta<typeof InteractiveCard>;

export default meta;

type Story = StoryObj<typeof meta>;

function AccountCardPreview(args: ComponentProps<typeof InteractiveCard>) {
  return (
    <Box style={dashboardBackdropStyle}>
      <InteractiveCard {...args} style={previewCardStyle}>
        <Flex
          direction="column"
          justifyContent="space-between"
          style={cardBodyStyle}
        >
          <Flex justifyContent="space-between" alignItems="flex-start" gap={4}>
            <Flex direction="column" gap={1}>
              <Text as="h3" fontSize="1.25rem" fontWeight="black">
                KB나라사랑우대 입출금
              </Text>
              <Text as="p" fontSize="0.75rem" fontWeight="medium" color="thumb">
                1234-56-789012
              </Text>
            </Flex>
            <Button
              type="button"
              variant="transparent"
              size="icon"
              aria-label="계좌 옵션 더보기"
            >
              ⋯
            </Button>
          </Flex>

          <Flex direction="column" gap={4} paddingTop={8}>
            <Flex direction="column" gap={1}>
              <Text as="span" fontSize="0.75rem" fontWeight="medium">
                현재 잔액
              </Text>
              <Text as="strong" fontSize="2rem" fontWeight="black">
                12,345,678원
              </Text>
            </Flex>

            <Button type="button" variant="default">
              이체
            </Button>
          </Flex>
        </Flex>
      </InteractiveCard>
    </Box>
  );
}

export const Playground: Story = {
  render: (args: ComponentProps<typeof InteractiveCard>) => (
    <AccountCardPreview {...args} />
  ),
};

export const SpotlightWithoutHint: Story = {
  args: {
    hoverHint: undefined,
  },
  render: (args: ComponentProps<typeof InteractiveCard>) => (
    <AccountCardPreview {...args} />
  ),
};

export const LayoutCapacity: Story = {
  render: (args: ComponentProps<typeof InteractiveCard>) => (
    <Box style={dashboardBackdropStyle}>
      <InteractiveCard
        {...args}
        hoverHint="카드 안에서 CTA, 상태, 보조 액션을 함께 배치할 수 있습니다."
        style={previewCardStyle}
      >
        <Flex direction="column" gap={5} style={cardBodyStyle}>
          <Flex justifyContent="space-between" alignItems="center">
            <Text as="h3" variant="title">
              이번 달 소비 요약
            </Text>
            <Text as="span" fontSize="0.75rem" fontWeight="medium">
              03월
            </Text>
          </Flex>

          <Box
            padding={4}
            borderRadius="md"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.42), rgba(255,255,255,0.18))",
              border: `1px solid color-mix(in oklch, ${vars.color.border} 35%, white)`,
            }}
          >
            <Flex justifyContent="space-between" alignItems="center" gap={4}>
              <Text as="span" fontWeight="medium">
                식비
              </Text>
              <Text as="strong" fontWeight="black">
                328,400원
              </Text>
            </Flex>
          </Box>

          <Flex gap={3}>
            <Button type="button" variant="default">
              상세 보기
            </Button>
            <Button type="button" variant="transparent">
              닫기
            </Button>
          </Flex>
        </Flex>
      </InteractiveCard>
    </Box>
  ),
};

export const UsageGuidance: Story = {
  render: () => (
    <StoryDoc
      title="InteractiveCard Usage Guidance"
      lead={
        <>
          <code>InteractiveCard</code>는 단순 카드 외형이 아니라 interactive
          layout surface입니다. 이 문서는 대시보드 계좌 카드처럼 spotlight와
          glass shell이 컴포넌트 정체성의 일부인 경우, 어떤 식으로 배치하고 어떤
          props를 넘겨야 하는지 설명합니다.
        </>
      }
    >
      <StoryDocSection title="무엇을 제공하나">
        <StoryDocList
          items={[
            <>
              바깥쪽 <strong>glass shell</strong>, 내부 content wrapper,
              spotlight overlay를 함께 제공합니다.
            </>,
            <>
              기본적으로 내부 content 영역에 <code>width: 100%</code>,{" "}
              <code>height: 100%</code>, padding을 부여하므로 카드형 레이아웃의
              시작점을 바로 얻을 수 있습니다.
            </>,
            <>
              hover 시 spotlight와 shell shadow가 함께 반응하므로, 카드 자체가
              인터랙션 affordance가 됩니다.
            </>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="대시보드 기본 스타일과의 관계">
        <StoryDocParagraph>
          Storybook 기본 예시는 실제 대시보드의 계좌 카드 문맥을 기준으로
          재구성했습니다. 카드 단독만 보면 glass shell의 의도가 약해지기 때문에,
          주변 배경도 디바이스 내부의 밝은 그라데이션 패널처럼 함께 보여주도록
          바꿨습니다.
        </StoryDocParagraph>
        <StoryDocNote>
          즉, 이 컴포넌트는 배경과 분리된 “떠 있는 박스”보다, 대시보드나
          디바이스 문맥 안에서 interactive card surface로 읽히도록 preview하는
          편이 더 정확합니다.
        </StoryDocNote>
      </StoryDocSection>

      <StoryDocSection title="레이아웃 관점에서 언제 사용하나">
        <StoryDocList
          items={[
            <>
              카드 내부에 제목, 보조 정보, 수치, CTA를{" "}
              <strong>하나의 상호작용 surface 안에서 묶어</strong> 보여줘야 할
              때 사용합니다.
            </>,
            <>
              hover spotlight가 단순 장식이 아니라 카드 선택 가능성, 주목도,
              affordance를 전달해야 할 때 적합합니다.
            </>,
            <>
              내부 배치를 `Flex`나 `Grid`로 자유롭게 구성하되, 바깥 shell과 카드
              감도는 공통으로 유지하고 싶을 때 적합합니다.
            </>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="언제 사용하지 않나">
        <StoryDocList
          items={[
            <>
              단순 정보 카드이고 hover spotlight가 필요 없으면{" "}
              <code>Surface</code>나 <code>Box</code>가 더 단순합니다.
            </>,
            <>
              내부 padding이나 shell 구조 없이 완전히 자유로운 레이아웃 박스가
              필요하면 <code>Box</code>, <code>Flex</code>, <code>Grid</code>로
              직접 조합하는 편이 낫습니다.
            </>,
            <>
              클릭 가능성이 전혀 없는 정적 패널에 과한 인터랙션을 넣고 싶지
              않다면 이 컴포넌트는 과합니다.
            </>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="주요 props">
        <StoryDocTable
          columns={["prop", "기본값", "타입", "설명"]}
          rows={[
            [
              inlineCode("children"),
              "-",
              "ReactNode",
              "카드 내부 content wrapper 안에 렌더될 콘텐츠입니다. 실제 레이아웃은 보통 여기서 Flex/Grid로 구성합니다.",
            ],
            [
              inlineCode("hoverHint"),
              "-",
              inlineCode("string"),
              "카드 아래에 표시되는 hover 안내 문구입니다. spotlight affordance를 설명해야 할 때만 사용합니다.",
            ],
            [
              inlineCode("contentClassName"),
              "-",
              inlineCode("string"),
              "내부 content wrapper에 클래스를 주입합니다. 카드 shell은 유지한 채 내부 레이아웃만 조정할 때 사용합니다.",
            ],
            [
              inlineCode("className"),
              "-",
              inlineCode("string"),
              "바깥 root에 클래스를 추가합니다. 카드 전체 크기나 외부 배치를 제어할 때 사용합니다.",
            ],
            [
              inlineCode("style"),
              "-",
              "React.CSSProperties",
              "예외적인 크기나 레이아웃 조정만 여기에 둡니다.",
            ],
            [
              "native div props",
              "-",
              <>
                {inlineCode("aria-*")}, {inlineCode("data-*")},{" "}
                {inlineCode("onClick")}
              </>,
              "일반 HTML div 속성은 그대로 전달됩니다.",
            ],
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="레이아웃 책임">
        <StoryDocTable
          columns={["영역", "컴포넌트가 책임지는 것", "개발자가 책임지는 것"]}
          rows={[
            [
              "외부 shell",
              "glass background, radius, shadow, spotlight overlay",
              "부모 안에서 카드가 놓일 크기와 문맥 배경",
            ],
            [
              "내부 content",
              "기본 padding, full width/full height wrapper",
              "제목/본문/CTA의 실제 정렬 구조",
            ],
            [
              "hover affordance",
              "spotlight 위치 추적, hint 노출, hover shadow",
              "정말 hover affordance가 필요한 화면인지 판단",
            ],
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="예시">
        <StoryDocCode
          code={`<InteractiveCard hoverHint="커서를 올려 자세히 보기">
  <Flex direction="column" justifyContent="space-between" style={{ minHeight: "18rem" }}>
    <Flex justifyContent="space-between" alignItems="flex-start">
      <Text as="h3" variant="title">계좌 요약</Text>
      <Button variant="transparent" size="icon" aria-label="옵션 열기">
        ⋯
      </Button>
    </Flex>

    <Flex direction="column" gap={4}>
      <Text as="strong" fontSize="2rem" fontWeight="black">
        12,345,678원
      </Text>
      <Button>이체</Button>
    </Flex>
  </Flex>
</InteractiveCard>`}
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
          "InteractiveCard를 interactive layout surface로 사용할 때의 기준과 레이아웃 책임을 정리한 문서형 스토리입니다.",
      },
    },
  },
};
