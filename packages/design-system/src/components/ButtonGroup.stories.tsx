import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { ButtonGroup } from "./ButtonGroup";

const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    docs: {
      description: {
        component:
          "여러 개의 버튼을 그룹화하여 보여줄 때 사용하는 컴포넌트입니다.",
      },
    },
  },
  args: {},
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <ButtonGroup orientation="horizontal">
      <Button variant="default">취소</Button>
      <Button variant="primary">확인</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="primary">메인 액션</Button>
      <Button variant="default">보조 액션</Button>
    </ButtonGroup>
  ),
};
