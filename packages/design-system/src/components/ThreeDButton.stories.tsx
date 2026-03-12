import type { Meta, StoryObj } from "@storybook/react";
import Link from "next/link";
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
import { ThreeDButton } from "./ThreeDButton";

const variantOptions = ["default", "confirm", "destructive"] as const;
const statusOptions = ["idle", "pending", "resolved", "rejected"] as const;
const inlineCode = (value: string) => <code key={value}>{value}</code>;

const meta = {
  title: "Components/ThreeDButton",
  component: ThreeDButton,
  tags: ["autodocs"],
  args: {
    children: "시작하기",
    variant: "default",
    status: "idle",
  },
  argTypes: {
    variant: {
      control: "select",
      options: variantOptions,
      description: "3D 버튼 셸의 의미 기반 톤입니다.",
    },
    status: {
      control: "select",
      options: statusOptions,
      description:
        "버튼 상호작용 상태 계약입니다. `pending`이면 상호작용이 비활성화되고 점 애니메이션이 재생됩니다.",
    },
    as: {
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
          "강한 시각적 개성을 가진 상태 기반 버튼입니다. 텍스트 교체나 단순 disabled 처리만으로는 부족하고, 액션 자체가 모션으로 진행 상태를 전달해야 할 때 `ThreeDButton`을 사용합니다.",
      },
      source: {
        type: "code",
        transform: (src: string) =>
          src
            .replaceAll("React.Memo", "ThreeDButton")
            .replaceAll("_ThreeDButton", "ThreeDButton"),
      },
    },
  },
} satisfies Meta<typeof ThreeDButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args: ComponentProps<typeof ThreeDButton>) => (
    <ThreeDButton {...args} />
  ),
  parameters: {
    docs: {
      source: {
        code: `<ThreeDButton variant="default" status="idle">
  시작하기
</ThreeDButton>`,
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <Flex gap={6} flexWrap="wrap" alignItems="center">
      <ThreeDButton variant="default">기본</ThreeDButton>
      <ThreeDButton variant="confirm">확인</ThreeDButton>
      <ThreeDButton variant="destructive">삭제</ThreeDButton>
    </Flex>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Flex gap={6} flexWrap="wrap" alignItems="center">
  <ThreeDButton variant="default">기본</ThreeDButton>
  <ThreeDButton variant="confirm">확인</ThreeDButton>
  <ThreeDButton variant="destructive">삭제</ThreeDButton>
</Flex>`,
      },
    },
  },
};

export const StatusStates: Story = {
  render: () => (
    <Flex gap={6} flexWrap="wrap" alignItems="center">
      <ThreeDButton status="idle">기본</ThreeDButton>
      <ThreeDButton status="pending">진행 중</ThreeDButton>
      <ThreeDButton status="resolved">완료</ThreeDButton>
      <ThreeDButton status="rejected" variant="destructive">
        실패
      </ThreeDButton>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "현재 구현은 `pending` 상태에서 애니메이션을 재생하고 상호작용을 막습니다. `resolved`와 `rejected`는 공개 상태 계약에 포함되어 있지만, 시각 표현은 아직 중립적으로 유지됩니다.",
      },
      source: {
        code: `<Flex gap={6} flexWrap="wrap" alignItems="center">
  <ThreeDButton status="idle">기본</ThreeDButton>
  <ThreeDButton status="pending">진행 중</ThreeDButton>
  <ThreeDButton status="resolved">완료</ThreeDButton>
  <ThreeDButton status="rejected" variant="destructive">
    실패
  </ThreeDButton>
</Flex>`,
      },
    },
  },
};

export const IntroEntryAction: Story = {
  render: () => (
    <ThreeDButton as={Link} href="/intro">
      시작하기
    </ThreeDButton>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "앱 랜딩 페이지에서 사용하는 진입 CTA 패턴과 동일한 사용 예시입니다.",
      },
      source: {
        code: `function StartButton() {
  const { add } = useHistory();

  const handleStart = () => {
    add(window.location.href);
  };

  return (
    <ThreeDButton as={Link} onClick={handleStart} href="/intro">
      시작하기
    </ThreeDButton>
  );
}`,
      },
    },
  },
};

export const SubmitPendingAction: Story = {
  render: () => (
    <ThreeDButton type="submit" status="pending" disabled>
      확인
    </ThreeDButton>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "앱의 폼 제출 래퍼에서 사용하는 submit 액션 패턴과 동일한 사용 예시입니다.",
      },
      source: {
        code: `export function SubmitButton({ isPending, ...props }: SubmitButtonProps) {
  return (
    <Flex placeItems="center">
      <ThreeDButton
        type="submit"
        status={isPending ? "pending" : "idle"}
        disabled={isPending}
        {...props}
      >
        확인
      </ThreeDButton>
    </Flex>
  );
}`,
      },
    },
  },
};

export const UsageGuidance: Story = {
  render: () => (
    <StoryDoc
      title="ThreeDButton Usage Guidance"
      lead={
        <>
          <code>ThreeDButton</code>은 강한 시각적 셸과 pending 모션을 가진
          버튼입니다. 이 문서는 단순한 스타일 데모가 아니라, 어떤 상황에서 표준{" "}
          <code>Button</code> 대신 이 컴포넌트를 선택해야 하는지 설명합니다.
        </>
      }
    >
      <StoryDocSection title="언제 사용하나">
        <StoryDocList
          items={[
            <>
              Hero CTA, 인증 진입, 완료 확인처럼{" "}
              <strong>버튼 자체가 제품 경험의 일부</strong>여야 한다.
            </>,
            <>
              진행 상태를 단순 비활성화가 아니라 <strong>모션으로 전달</strong>
              해야 한다.
            </>,
            <>화면 안에서 하나의 주요 액션을 강하게 띄워야 한다.</>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="언제 사용하지 않나">
        <StoryDocList
          items={[
            <>
              표준 폼 제출, 툴바 액션, 리스트 액션처럼 밀도가 높은 UI에는 먼저{" "}
              <code>Button</code>을 사용한다.
            </>,
            <>
              인라인 탐색이나 보조 행동에는 <code>AppLink</code>가 더 맞다.
            </>,
            <>
              시각적 임팩트보다 일관된 네이티브 의미가 우선이면{" "}
              <code>ThreeDButton</code>은 과하다.
            </>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="접근성">
        <StoryDocParagraph>
          기본 렌더가 <code>button</code>일 때는 다음 계약을 제공합니다.
        </StoryDocParagraph>
        <StoryDocTable
          columns={["항목", "기본 제공", "설명"]}
          rows={[
            [
              inlineCode("button"),
              "버튼 의미와 키보드 상호작용",
              "기본 렌더는 button이므로 스크린 리더와 키보드 사용자가 버튼으로 인식합니다.",
            ],
            [
              inlineCode('status="pending"'),
              <span key="pending-contract">
                {inlineCode("aria-busy")} + 클릭 차단
              </span>,
              "pending이면 애니메이션이 재생되고 클릭이 막힙니다.",
            ],
            [
              inlineCode("disabled"),
              "native button 비활성화",
              "button으로 렌더될 때만 disabled가 실제 disabled 속성으로 전달됩니다.",
            ],
            [
              inlineCode("as"),
              "element 교체",
              "Link나 다른 element로 바꾸면 그 element의 의미를 따릅니다. 이때 링크 의미, 포커스 가능성, 라벨 품질은 개발자가 책임져야 합니다.",
            ],
          ]}
        />
        <StoryDocNote>
          <code>as={"{Link}"}</code> 같은 패턴으로 button이 아닌 element를 쓰는
          순간, 이 컴포넌트가 자동으로 링크 접근성을 보장해주지는 않습니다.
          목적에 맞는 element와 속성을 직접 선택해야 합니다.
        </StoryDocNote>
      </StoryDocSection>

      <StoryDocSection title="상태 계약">
        <StoryDocTable
          columns={["status", "현재 동작", "주의점"]}
          rows={[
            [
              inlineCode('"idle"'),
              "기본 인터랙션 상태",
              "일반 클릭 가능한 상태입니다.",
            ],
            [
              inlineCode('"pending"'),
              "점 애니메이션 재생, aria-busy 설정, 클릭 차단",
              "중복 제출 방지나 진행 중 표시가 필요할 때 사용합니다.",
            ],
            [
              inlineCode('"resolved"'),
              "공개 상태 계약에는 포함",
              "현재 시각 표현은 idle과 크게 구분되지 않으므로, 별도 성공 표현을 기대하고 쓰면 안 됩니다.",
            ],
            [
              inlineCode('"rejected"'),
              "공개 상태 계약에는 포함",
              "현재 시각 표현은 idle과 크게 구분되지 않으므로, 실패 상태를 명확히 드러내려면 주변 UI가 함께 책임져야 합니다.",
            ],
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
              inlineCode('"default" | "confirm" | "destructive"'),
              "3D 버튼 셸의 의미 기반 톤입니다.",
            ],
            [
              inlineCode("status"),
              inlineCode('"idle"'),
              inlineCode('"idle" | "pending" | "resolved" | "rejected"'),
              "상호작용 상태 계약입니다. 현재 명확한 시각 변화는 pending에 집중되어 있습니다.",
            ],
            [
              inlineCode("as"),
              inlineCode('"button"'),
              "generic element type",
              "Link나 anchor처럼 다른 element로 렌더할 수 있습니다.",
            ],
            [
              inlineCode("disabled"),
              inlineCode("false"),
              inlineCode("boolean"),
              "button으로 렌더될 때만 네이티브 disabled 속성으로 전달됩니다.",
            ],
            [
              inlineCode("type"),
              inlineCode('"button"'),
              inlineCode('"button" | "submit" | "reset"'),
              "button element를 사용할 때 기본 동작을 정합니다.",
            ],
            [
              <span key="element-props">
                {inlineCode("href")}, {inlineCode("onClick")},{" "}
                {inlineCode("aria-*")}
              </span>,
              "-",
              "element-specific props",
              "선택한 element가 받는 속성은 그대로 전달됩니다.",
            ],
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="예시">
        <StoryDocCode
          code={`<ThreeDButton as={Link} href="/intro">
  시작하기
</ThreeDButton>

<ThreeDButton type="submit" status={isPending ? "pending" : "idle"}>
  확인
</ThreeDButton>

<ThreeDButton variant="confirm" onClick={handleApprove}>
  승인
</ThreeDButton>

<ThreeDButton variant="destructive" onClick={handleDelete}>
  삭제
</ThreeDButton>`}
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
          "실제 구현 계약에 맞춘 ThreeDButton 사용 문서입니다. 표준 Button과의 선택 기준, 상태 계약, 접근성 책임을 문서 형태로 정리합니다.",
      },
    },
  },
};
