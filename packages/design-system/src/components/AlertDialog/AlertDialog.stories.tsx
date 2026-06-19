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
import { Button } from "../Button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./index";

const inlineCode = (value: string) => <code key={value}>{value}</code>;

const meta = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "사용자의 확인이 필요한 중요한 액션(예: 삭제, 결제, 취소)을 수행하기 전에 경고창을 띄우는 컴포넌트입니다. Composable 패턴(shadcn/ui 스타일)으로 구성되어 있습니다.",
      },
    },
  },
  args: {
    defaultOpen: false,
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    defaultOpen: false,
  },
  render: (args) => (
    <Flex style={{ padding: "100px", justifyContent: "center" }}>
      <AlertDialog {...args}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">계정 삭제</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              이 작업은 되돌릴 수 없습니다. 계정이 영구적으로 삭제되며, 모든
              데이터가 서버에서 제거됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction>삭제</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  ),
};

export const UsageGuidance: Story = {
  render: () => (
    <StoryDoc
      title="AlertDialog Usage Guidance"
      lead={
        <>
          <code>AlertDialog</code>는 사용자가 의도치 않게 파괴적인(Destructive)
          행동을 하거나, 중요한 흐름을 방해하는 실수를 하는 것을 막기 위해
          사용하는 <strong>가장 강력한 경고 수단</strong>입니다.
        </>
      }
    >
      <StoryDocSection title="언제 사용하나">
        <StoryDocParagraph>
          사용자의 흐름을 강제로 중단시키고, 반드시 명시적인 응답을 받아야만 할
          때 사용합니다.
        </StoryDocParagraph>
        <StoryDocList
          items={[
            <>
              <strong>파괴적인 액션:</strong> 데이터 삭제, 계정 탈퇴, 결제 취소
              등 되돌릴 수 없는 작업을 수행하기 직전
            </>,
            <>
              <strong>중요한 흐름 중단:</strong> 작성 중인 긴 양식을 저장하지
              않고 뒤로 가기를 누를 때 ("저장하지 않고 나가시겠습니까?")
            </>,
            <>
              <strong>중대한 오류:</strong> 세션 만료, 네트워크 심각한 오류 등
              사용자가 반드시 인지하고 확인을 눌러야 하는 상황
            </>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="언제 사용하지 않나">
        <StoryDocList
          items={[
            <>
              <strong>단순한 정보 전달:</strong> "저장되었습니다", "클립보드에
              복사되었습니다" 같은 메시지는 <code>Toast</code>나{" "}
              <code>Snackbar</code>를 사용하세요.
            </>,
            <>
              <strong>입력 폼이나 복잡한 뷰:</strong> 내부에 텍스트 인풋, 스크롤
              가능한 긴 목록, 탭 등이 필요하다면 <code>AlertDialog</code>가
              아니라 일반 <code>Dialog</code>를 사용해야 합니다.
            </>,
            <>
              <strong>자주 반복되는 액션:</strong> 사용자가 반복적으로 클릭해야
              하는 작업에 다이얼로그를 띄우면 피로도가 급증합니다. (이 경우
              인라인 실행 후 되돌리기(Undo) 패턴을 고려하세요)
            </>,
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="구조와 컴포넌트">
        <StoryDocParagraph>
          <code>AlertDialog</code>는 컴포지션(Composition) 패턴을 사용하여
          구성됩니다. 이 패턴은 레이아웃과 스타일의 유연성을 극대화합니다.
        </StoryDocParagraph>
        <StoryDocTable
          columns={["컴포넌트", "역할", "설명"]}
          rows={[
            [
              inlineCode("AlertDialog"),
              "Root",
              "상태(열림/닫힘)를 관리하는 최상위 컨텍스트입니다.",
            ],
            [
              inlineCode("AlertDialogTrigger"),
              "트리거",
              "다이얼로그를 여는 버튼입니다. 기본적으로 asChild를 통해 자식 요소에 이벤트를 전달합니다.",
            ],
            [
              inlineCode("AlertDialogContent"),
              "컨테이너",
              "오버레이(배경)와 함께 화면 중앙에 렌더링되는 실제 모달 창입니다.",
            ],
            [
              inlineCode("AlertDialogHeader"),
              "헤더 영역",
              "타이틀과 설명을 포함하는 상단 레이아웃 영역입니다.",
            ],
            [
              inlineCode("AlertDialogTitle"),
              "제목",
              "경고의 목적을 나타내는 h2 수준의 제목입니다.",
            ],
            [
              inlineCode("AlertDialogDescription"),
              "설명",
              "구체적인 경고 내용이나 결과를 설명하는 본문 텍스트입니다.",
            ],
            [
              inlineCode("AlertDialogFooter"),
              "푸터 영역",
              "취소 및 확인 버튼이 배치되는 하단 레이아웃 영역입니다.",
            ],
            [
              inlineCode("AlertDialogAction"),
              "확인 버튼",
              "계속 진행하는 액션을 실행하며 모달을 닫습니다. 파괴적 액션일 경우 variant를 조정해야 할 수 있습니다.",
            ],
            [
              inlineCode("AlertDialogCancel"),
              "취소 버튼",
              "작업을 중단하고 모달을 닫는 기본 버튼입니다.",
            ],
          ]}
        />
      </StoryDocSection>

      <StoryDocSection title="접근성 (A11y)">
        <StoryDocParagraph>
          경고 다이얼로그는 스크린 리더 사용자에게 매우 중요하게 다루어져야
          합니다.
        </StoryDocParagraph>
        <StoryDocTable
          columns={["항목", "기본 제공", "설명"]}
          rows={[
            [
              inlineCode('role="alertdialog"'),
              "의미 론적 역할",
              "일반 다이얼로그(dialog)와 달리, 보조 기술에 이것이 사용자 응답이 필요한 '경고'임을 강하게 알립니다.",
            ],
            [
              "Focus Trapping",
              "포커스 가두기",
              "다이얼로그가 열려 있는 동안 사용자는 배경(바깥쪽)에 있는 요소로 탭(Tab) 포커스를 이동할 수 없습니다.",
            ],
            [
              inlineCode("aria-describedby"),
              "자동 연결",
              "AlertDialogDescription의 내용을 모달과 자동으로 연결하여, 모달이 뜰 때 스크린 리더가 설명을 즉시 읽도록 합니다.",
            ],
            [
              "Escape 키 지원",
              "단축키 닫기",
              "키보드의 Esc 키를 누르면 AlertDialogCancel을 누른 것과 동일하게 취소되며 다이얼로그가 닫힙니다.",
            ],
          ]}
        />
        <StoryDocNote>
          일반적으로 <code>AlertDialog</code>는 배경(Overlay)을 클릭하여 닫을 수
          없어야 합니다. 사용자가 내용을 읽지 않고 실수로 바깥쪽을 클릭해
          경고창이 닫히는 것을 방지하기 위함입니다. 명시적으로 '취소' 버튼을
          누르도록 유도하세요.
        </StoryDocNote>
      </StoryDocSection>

      <StoryDocSection title="예시">
        <StoryDocCode
          code={`import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@packages/design-system";
import { Button } from "@packages/design-system";

export function DeleteConfirmation() {
  return (
    <AlertDialog>
      {/* 1. 트리거 (asChild로 커스텀 버튼 사용 가능) */}
      <AlertDialogTrigger asChild>
        <Button variant="destructive">계정 삭제</Button>
      </AlertDialogTrigger>
      
      {/* 2. 실제 모달 창 */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            이 작업은 되돌릴 수 없습니다. 계정이 영구적으로 삭제되며,
            모든 데이터가 서버에서 제거됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        {/* 3. 푸터 (취소/확인 버튼) */}
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction 
            variant="destructive" 
            onClick={() => executeDelete()}
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
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
          "실제 구현 계약에 맞춘 AlertDialog 사용 문서입니다. 파괴적 액션 전의 사용자 확인 흐름, 컴포지션 API의 구조, 접근성 보장 방식을 상세히 안내합니다.",
      },
    },
  },
};
