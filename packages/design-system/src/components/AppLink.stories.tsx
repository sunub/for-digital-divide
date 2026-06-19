import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { Box } from "../primitives/Box";
import { Flex } from "../primitives/Flex";
import { vars } from "../tokens/theme.css";
import { AppLink } from "./AppLink";

type SemanticColorToken = keyof typeof vars.color;

const semanticColorOptions = Object.keys(vars.color) as SemanticColorToken[];
const semanticColorMapping = Object.fromEntries(
  semanticColorOptions.map((token) => [token, vars.color[token]]),
) as Record<SemanticColorToken, string>;

function renderStandoutPreview(args: ComponentProps<typeof AppLink>) {
  return (
    <Box backgroundColor="background" padding={8} borderRadius="lg">
      <AppLink {...args} />
    </Box>
  );
}

const meta = {
  title: "Components/AppLink",
  component: AppLink,
  tags: ["autodocs"],
  args: {
    children: "회원가입",
    href: "/sign-up/register-user",
    variant: "standout",
    standoutColor: "standOut",
    standoutUnderlineColor: "standOut",
    hoverColor: "button",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["inline", "standout"],
      description:
        "본문 링크에는 `inline`, 로그인 선택 화면 같은 CTA 링크에는 `standout`을 사용합니다.",
    },
    hoverColor: {
      control: "select",
      options: semanticColorOptions,
      mapping: semanticColorMapping,
      description:
        "`standout` variant에서 hover/focus 시 텍스트에 적용되는 semantic color token입니다.",
    },
    standoutColor: {
      control: "select",
      options: semanticColorOptions,
      mapping: semanticColorMapping,
      description:
        "`standout` variant의 기본 텍스트 색상으로 사용하는 semantic color token입니다.",
    },
    standoutUnderlineColor: {
      control: "select",
      options: semanticColorOptions,
      mapping: semanticColorMapping,
      description:
        "`standout` variant의 기본 underline 색상으로 사용하는 semantic color token입니다.",
    },
    className: {
      control: false,
    },
    style: {
      control: false,
    },
    onClick: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Next.js 기반 공통 링크 컴포넌트입니다. 본문 안의 일반 링크에는 `inline`을, 굵은 밑줄로 더 강하게 강조해야 하는 링크에는 `standout`을 사용합니다.",
      },
    },
  },
} satisfies Meta<typeof AppLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args: ComponentProps<typeof AppLink>) => renderStandoutPreview(args),
  parameters: {
    docs: {
      description: {
        story:
          "`LoginSelection` CTA와 같은 `standout` 기본 동작을 기준으로 확인하는 playground입니다. 기본 underline이 항상 보이고, hover나 focus 시 underline이 눌리며 라벨이 올라옵니다.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" alignItems="flex-start" gap={5}>
      <AppLink href="/dashboard" variant="inline">
        대시보드 가이드 보기
      </AppLink>
      <AppLink href="/sign-up" variant="standout">
        계정 만들기
      </AppLink>
    </Flex>
  ),
};

export const CustomStandoutColors: Story = {
  args: {
    children: "로그인 플로우 열기",
    href: "/login",
    variant: "standout",
    standoutColor: "standOut",
    standoutUnderlineColor: "button",
    hoverColor: "confirm",
  },
  render: (args: ComponentProps<typeof AppLink>) => renderStandoutPreview(args),
  parameters: {
    docs: {
      description: {
        story:
          "임의의 문자열 색상 대신 `vars.color`에 등록된 semantic token을 선택해 standout 링크의 텍스트, underline, hover 색상을 검증합니다.",
      },
    },
  },
};

export const LoginSelectionCallToAction: Story = {
  render: () => (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <AppLink href="/sign-up/register-user" variant="standout">
        회원가입
      </AppLink>
      <Box
        color="text"
        style={{ maxWidth: "300px", opacity: 0.72, textAlign: "center" }}
      >
        회원가입을 하지 않으셨다면 회원가입을 해주세요.
      </Box>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "로그인 선택 화면처럼 강한 행동 유도가 필요한 링크는 `standout` variant를 사용합니다. 두꺼운 밑줄이 기본 상태에서 항상 보이고, hover나 focus 시 밑줄이 눌리며 텍스트가 살짝 올라옵니다.",
      },
    },
  },
};
