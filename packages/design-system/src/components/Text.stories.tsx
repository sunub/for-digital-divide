import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "../primitives/Box";
import { Flex } from "../primitives/Flex";
import { Text } from "./Text";

const meta = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  args: {
    children: "공통 타이포그래피 스케일",
    variant: "body",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Box 위에 구축한 의미 기반 텍스트 래퍼입니다. 가능하면 로컬 `font-size` 선언 대신 텍스트 variant를 사용합니다.",
      },
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const TypeScale: Story = {
  render: () => (
    <Box style={{ maxWidth: "36rem" }}>
      <Flex direction="column" gap={4}>
        <Text as="h1" variant="hero">
          첫 화면의 메시지를 위한 Hero 텍스트
        </Text>
        <Text as="h2" variant="title">
          카드, 대시보드, 섹션 헤더용 제목
        </Text>
        <Text variant="body">
          Body 텍스트는 기본 읽기 흐름에 사용합니다. 페이지 전반에서
          line-height와 색상을 예측 가능하게 유지합니다.
        </Text>
        <Text variant="bodyStrong">
          BodyStrong은 강조가 필요할 때 사용합니다.
        </Text>
        <Text variant="description" color="button">
          Description은 짧은 보조 설명을 위한 스케일입니다.
        </Text>
      </Flex>
    </Box>
  ),
};
