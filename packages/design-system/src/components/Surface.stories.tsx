import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { Flex } from "../primitives/Flex";
import { Surface } from "./Surface";
import { Text } from "./Text";

const meta = {
  title: "Components/Surface",
  component: Surface,
  tags: ["autodocs"],
  args: {
    tone: "canvas",
    elevation: "raised",
    padding: 8,
  },
  parameters: {
    docs: {
      description: {
        component:
          "카드와 패널을 위한 공통 surface 셸입니다. 로컬에서 새로운 배경/그림자 조합을 만들기 전에 먼저 tone과 elevation 조합을 사용합니다.",
      },
    },
  },
} satisfies Meta<typeof Surface>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args: ComponentProps<typeof Surface>) => (
    <Surface {...args}>
      <Flex direction="column" gap={3}>
        <Text as="h3" variant="title">
          Surface 제목
        </Text>
        <Text variant="body" color="text">
          Surface는 공통 배경, 전경색, elevation 표현을 제공합니다.
        </Text>
      </Flex>
    </Surface>
  ),
};

export const Tones: Story = {
  render: () => (
    <Flex direction="column" gap={4}>
      <Surface tone="canvas">
        <Text variant="bodyStrong">캔버스 톤</Text>
      </Surface>
      <Surface tone="subtle">
        <Text variant="bodyStrong">서브틀 톤</Text>
      </Surface>
      <Surface tone="emphasis">
        <Text variant="bodyStrong">강조 톤</Text>
      </Surface>
    </Flex>
  ),
};
