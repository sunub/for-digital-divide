import type { Meta, StoryObj } from "@storybook/react";
import { Backdrop } from "./Backdrop";

const meta = {
  title: "Components/Backdrop",
  component: Backdrop,
  parameters: {
    docs: {
      description: {
        component:
          "모달이나 드로어의 배경에 깔리는 오버레이(blur) 컴포넌트입니다.",
      },
    },
  },
  args: {},
} satisfies Meta<typeof Backdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    blur: "soft",
  },
};
