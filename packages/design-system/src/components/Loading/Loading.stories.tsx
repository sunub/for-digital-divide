import type { Meta, StoryObj } from "@storybook/react-vite";
import { Loading } from "./ui/Loading";

const meta = {
  title: "Components/Loading",
  component: Loading,
  parameters: {
    docs: {
      description: {
        component: "로딩 상태를 시각적으로 나타내는 애니메이션 컴포넌트입니다.",
      },
    },
  },
  args: {
    size: 5,
    radius: "1rem",
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    size: 10,
  },
};
