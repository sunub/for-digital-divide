import type { Meta, StoryObj } from "@storybook/react";
import VisuallyHidden from "./VisuallyHidden";

const meta = {
  title: "Components/VisuallyHidden",
  component: VisuallyHidden,
  parameters: {
    docs: {
      description: {
        component: "화면에서는 보이지 않지만 스크린 리더 등 보조 기기에서는 읽을 수 있도록 접근성을 제공하는 컴포넌트입니다.",
      },
    },
  },
  args: {
    children: "시각적으로는 숨겨져 있지만 스크린 리더에서는 읽히는 텍스트",
  },
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {},
};
