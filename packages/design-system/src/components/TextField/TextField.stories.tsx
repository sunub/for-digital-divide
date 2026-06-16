import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";

const meta = {
  title: "Components/TextField",
  component: TextField,
  parameters: {
    docs: {
      description: {
        component: "기본적인 텍스트 입력을 위한 TextField 컴포넌트입니다. 라벨, 에러 상태, 커스텀 아이콘 등을 지원합니다.",
      },
    },
  },
  args: {
    placeholder: "텍스트를 입력하세요",
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    labelContent: "이메일",
    placeholder: "example@email.com",
  },
};

export const ErrorState: Story = {
  args: {
    labelContent: "비밀번호",
    isError: true,
    errorMessage: "비밀번호가 일치하지 않습니다.",
  },
};
