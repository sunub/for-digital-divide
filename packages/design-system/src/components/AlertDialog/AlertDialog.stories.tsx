import type { Meta, StoryObj } from "@storybook/react";
import { AlertDialog } from "./ui/AlertDialog";
import { AlertDialogTrigger } from "./ui/AlertDialogTrigger";
import { AlertDialogContent } from "./ui/AlertDialogContent";

const meta = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  parameters: {
    docs: {
      description: {
        component: "사용자의 확인이 필요한 중요한 액션(예: 삭제, 취소)을 수행하기 전에 경고창을 띄우는 컴포넌트입니다. Trigger와 Content를 사용하여 구성합니다.",
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
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <button style={{ padding: "8px 16px" }}>Open Alert</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div style={{ padding: "24px", background: "white", borderRadius: "8px" }}>
          <h3>정말 삭제하시겠습니까?</h3>
          <p>이 작업은 되돌릴 수 없습니다.</p>
          <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
            <AlertDialogTrigger asChild>
              <button>취소</button>
            </AlertDialogTrigger>
            <button style={{ background: "red", color: "white" }}>삭제</button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  ),
};
