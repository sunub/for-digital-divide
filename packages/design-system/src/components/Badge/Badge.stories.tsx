import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          "상태나 카테고리를 표시하는 배지 컴포넌트입니다. 아이콘과 함께 사용하거나 단독으로 사용할 수 있습니다.",
      },
    },
  },
  args: {
    children: "안내",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {},
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
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px" }}>
      <Badge icon="info">안내</Badge>
      <Badge icon="success">성공</Badge>
      <Badge icon="warning">경고</Badge>
      <Badge icon="error">오류</Badge>
      <Badge icon="start">시작</Badge>
    </div>
  ),
};
