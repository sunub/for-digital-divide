import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./index";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip.Provider, // Using Provider as the root for documentation
  parameters: {
    docs: {
      description: {
        component:
          "아이템에 마우스를 올리거나 포커스했을 때 부가적인 설명을 제공하는 툴팁 컴포넌트입니다. Provider, Trigger, Content의 Compound Component 패턴으로 구성됩니다.",
      },
    },
  },
  args: {
    children: "Hover me",
  },
} satisfies Meta<typeof Tooltip.Provider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <Tooltip.Provider>
      <Tooltip.Trigger
        style={{
          padding: "8px 16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        Hover or Focus me
      </Tooltip.Trigger>
      <Tooltip.Content side="top" align="center">
        이것은 툴팁 설명입니다.
      </Tooltip.Content>
    </Tooltip.Provider>
  ),
};
