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
import { Badge } from "./Badge";

const inlineCode = (value: string) => <code key={value}>{value}</code>;

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "안내",
  },
  argTypes: {
    tone: {
      control: "select",
      options: ["primary", "success", "destructive", "neutral"],
      description:
        "배지의 색상 톤을 지정합니다. 지정하지 않으면 icon 프리셋에 맞춰 자동 선택됩니다.",
    },
    icon: {
      control: "select",
      options: ["info", "success", "warning", "error", "start", undefined],
      description:
        "배지에 표시될 아이콘 프리셋을 지정하거나, 커스텀 ReactNode를 전달할 수 있습니다.",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    tone: "primary",
    children: "상태 배지",
  },
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px" }}>
      <Badge tone="primary">Primary</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="destructive">Destructive</Badge>
      <Badge tone="neutral">Neutral</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "제공되는 4가지 색상 톤입니다. 각 톤은 컴포넌트의 용도와 상태에 따라 선택하여 사용할 수 있습니다.",
      },
    },
  },
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Badge icon="info">안내</Badge>
      <Badge icon="success">성공</Badge>
      <Badge icon="warning">경고</Badge>
      <Badge icon="error">오류</Badge>
      <Badge icon="start">시작</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "자주 사용되는 아이콘은 프리셋 이름(`info`, `success`, `warning`, `error`, `start`)을 전달하여 간편하게 활성화할 수 있습니다.",
      },
    },
  },
};

export const UsageGuidance: Story = {
  render: () => (
    <StoryDoc
      title="Badge Usage Guidance"
      lead={
        <>
          <code>Badge</code>는 상태, 카테고리, 태그 또는 기타 시각적
          메타데이터를 표시하기 위한 <strong>비대화형(non-interactive)</strong>{" "}
          라벨 컴포넌트입니다. 이 문서는 올바른 컴포넌트 사용 가이드라인 및
          시각적/접근성 계약을 안내합니다.
        </>
      }
    >
      <StoryDocSection title="언제 사용하나">
        <StoryDocParagraph>
          다음 조건 중 하나 이상을 충족할 때 <code>Badge</code>를 고려합니다.
        </StoryDocParagraph>
        <StoryDocList
          items={[
            <>
              <strong>특정 요소의 상태 표시:</strong> "성공", "진행 중", "승인
              대기", "실패" 등 시스템 프로세스의 현재 상태를 간략하게 전달해야
              할 때.
            </>,
            <>
              <strong>분류 및 태깅:</strong> 목록이나 카드 아이템 옆에 카테고리,
              태그 등을 덧붙여 사용자가 쉽게 필터링하거나 맥락을 인지하게 하고
              싶을 때.
            </>,
            <>
              <strong>가벼운 강조:</strong> 본문 텍스트 내에서 가독성을 해치지
              않으면서, 특정 키워드나 중요한 짧은 메타데이터(예: "신규",
              "추천")를 강조해야 할 때.
            </>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="언제 사용하지 않나 (Anti-patterns)">
        <StoryDocParagraph>
          다음과 같은 상황에서는 <code>Badge</code> 대신 다른 컴포넌트를
          사용해야 합니다.
        </StoryDocParagraph>
        <StoryDocList
          items={[
            <>
              <strong>클릭이나 상호작용이 필요한 경우:</strong> 배지는 단순
              텍스트 표시를 목적으로 설계된 비대화형 요소입니다. 클릭하여 기능을
              수행하거나, 앵커로 동작하거나, 제거(Dismiss)가 가능한 경우엔{" "}
              <code>Button</code>이나 대화형 <code>Chip/Tab</code> 컴포넌트를
              사용해야 합니다.
            </>,
            <>
              <strong>긴 문장을 담으려는 경우:</strong> 배지는 1~2개 단어 수준의
              매우 간결한 텍스트에 최적화되어 있습니다. 여러 줄의 텍스트나 긴
              설명 문장을 삽입할 경우 레이아웃이 무너지고 인지적 효율이
              급감합니다.
            </>,
            <>
              <strong>알림 수치 표시(Notification Badges):</strong> 아바타나
              아이콘 모서리에 겹쳐서 '읽지 않은 메시지 수'나 '새 소식 빨간
              점(Dot)'을 표기하려는 경우, 이 컴포넌트로는 적합하지 않습니다.
              이때는 포지셔닝 기능이 특화된 Badge 컴포넌트를 별도로 구현하거나
              사용해야 합니다.
            </>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="인터페이스 및 동작 사양">
        <StoryDocParagraph>
          <code>Badge</code>의 Props 및 주요 자동 추론 동작은 다음과 같습니다.
        </StoryDocParagraph>
        <StoryDocTable
          columns={["Prop", "타입", "설명"]}
          rows={[
            [
              inlineCode("children"),
              inlineCode("ReactNode"),
              "배지 내부에 표시될 텍스트 콘텐츠입니다. 일반적으로 짧은 문자열을 권장합니다.",
            ],
            [
              inlineCode("icon"),
              inlineCode(
                '"info" | "success" | "warning" | "error" | "start" | ReactNode',
              ),
              "배지 왼쪽에 배치될 아이콘입니다. 내장된 프리셋 문자열을 사용하거나 임의의 커스텀 ReactNode를 주입할 수 있습니다.",
            ],
            [
              inlineCode("tone"),
              inlineCode('"primary" | "success" | "destructive" | "neutral"'),
              <>
                배지의 시각적 색상 테마입니다. 생략할 경우, <code>icon</code>{" "}
                프리셋의 성격에 맞춰 다음과 같이 자동으로 톤이 추론됩니다.
                <StoryDocList
                  items={[
                    <>
                      <code>icon="success"</code> &rarr; <code>success</code> 톤
                    </>,
                    <>
                      <code>icon="error"</code> &rarr; <code>destructive</code>{" "}
                      톤
                    </>,
                    <>
                      <code>icon="info"</code>, <code>"start"</code> &rarr;{" "}
                      <code>primary</code> 톤
                    </>,
                    <>
                      <code>icon="warning"</code> &rarr; <code>neutral</code> 톤
                    </>,
                  ]}
                />
              </>,
            ],
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="접근성 (A11y)">
        <StoryDocParagraph>
          <code>Badge</code>는 네이티브 HTML <code>span</code>으로 렌더링되며,
          다음과 같은 접근성 특성을 따릅니다.
        </StoryDocParagraph>
        <StoryDocTable
          columns={["대상", "기본 동작 및 처리", "설명"]}
          rows={[
            [
              inlineCode("Non-interactive"),
              "포커스 불가 (tabindex 없음)",
              "대화형 요소가 아니므로 스크린 리더 및 키보드 탭 순서(Tab Order)에서 제외됩니다.",
            ],
            [
              inlineCode("Preset Icons"),
              inlineCode('aria-hidden="true"'),
              "내장 아이콘 프리셋 사용 시 스크린 리더가 해당 아이콘을 읽지 않고 건너뛰어, 배지 안의 실제 텍스트만 깔끔하게 낭독하도록 보장합니다.",
            ],
            [
              inlineCode("Custom Icons"),
              "개발자 수동 제어 필요",
              "커스텀 ReactNode를 주입할 때 아이콘 자체가 텍스트와 동일한 정보를 갖고 있거나 무의미한 시각 장식이라면 이중 낭독을 피하기 위해 aria-hidden 등을 직접 적절히 부여해야 합니다.",
            ],
          ]}
        />
        <StoryDocNote>
          맥락상 배지가 나타내는 상태가 스크린 리더 사용자에게 매우 중요하지만
          배지 내부의 짧은 텍스트만으로는 이해하기 어려울 경우, 배지를 포함하는
          부모 요소에 <code>aria-describedby</code> 또는 추가적인 스크린 리더
          전용 텍스트(SR-only)를 제공하는 것을 권장합니다.
        </StoryDocNote>
      </StoryDocSection>

      <StoryDocSection title="예시">
        <StoryDocParagraph>
          실제 비즈니스 요구사항에 따라 <code>Badge</code>를 활용하는
          방식들입니다.
        </StoryDocParagraph>
        <StoryDocCode
          code={`import { Badge } from "@packages/design-system";
import { MdFavorite } from "react-icons/md";

// 1. 상태 표시를 위한 기본적인 형태 (아이콘 자동 톤 매핑)
function StatusIndicator() {
  return (
    <div>
      <Badge icon="success">완료됨</Badge>
      <Badge icon="error">실패</Badge>
    </div>
  );
}

// 2. 명시적인 톤 강제 지정 (경고 상황에 중립/Neutral 톤 입히기)
function CustomToneUsage() {
  return (
    <Badge icon="warning" tone="neutral">
      대기 중
    </Badge>
  );
}

// 3. 커스텀 아이콘과 함께 사용하기
function CustomIconUsage() {
  return (
    <Badge icon={<MdFavorite style={{ color: "red" }} />}>
      좋아요
    </Badge>
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
          "Badge 컴포넌트의 상세 사용 가이드라인입니다. 용도, 안티 패턴, 접근성 보장 방법 등을 확인할 수 있습니다.",
      },
    },
  },
};
