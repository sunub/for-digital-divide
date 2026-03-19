import type { Meta, StoryObj } from "@storybook/react";
import { AppLink } from "../components/AppLink";
import { Button } from "../components/Button";
import { Surface } from "../components/Surface";
import { Text } from "../components/Text";
import { Stack } from "../patterns/Stack";
import { Box } from "../primitives/Box";
import { Flex } from "../primitives/Flex";
import { Grid } from "../primitives/Grid";
import { vars } from "../tokens/theme.css";

/**
 * 인라인 코드 스타일을 위한 컴포넌트
 */
function Code({ children }: { children: string }) {
  return (
    <Box
      as="code"
      paddingLeft={2}
      paddingRight={2}
      borderRadius="sm"
      backgroundColor="device"
      color="button"
      style={{
        fontFamily: "monospace",
        fontSize: "0.9em",
        fontWeight: "bold",
      }}
    >
      {children}
    </Box>
  );
}

/**
 * 문서의 각 섹션을 구성하는 컴포넌트
 */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Stack space={4}>
      <Text variant="title" as="h2" color="foreground">
        {title}
      </Text>
      <Box
        paddingLeft={4}
        style={{ borderLeft: `4px solid ${vars.color.button}` }}
      >
        {children}
      </Box>
    </Stack>
  );
}

/**
 * 디자인 시스템의 전체적인 가이드를 제공하는 메인 문서 컴포넌트
 */
function DocsPage() {
  return (
    <Box
      padding={10}
      backgroundColor="background"
      color="foreground"
      style={{
        maxWidth: "60rem",
        margin: "0 auto",
        minHeight: "100vh",
        lineHeight: "1.6",
      }}
    >
      <Stack space={12}>
        {/* Header Section */}
        <Stack space={4}>
          <Text
            variant="description"
            color="button"
            style={{ letterSpacing: "0.1em", fontWeight: "bold" }}
          >
            FOR-DIGITAL-DIVIDE UI FRAMEWORK
          </Text>
          <Text variant="hero" as="h1">
            디자인 시스템 가이드 (Docs)
          </Text>
          <Text variant="body" color="text">
            이 문서는 고령층을 위한 간편 금융 서비스의 일관된 UI 구현을 위한
            원칙과 컴포넌트 구성을 설명합니다. 모든 컴포넌트는 직관적인 디자인과
            높은 가독성을 목표로 설계되었습니다.
          </Text>
        </Stack>

        {/* 1. Foundations Section */}
        <Section title="1. Foundations (Tokens)">
          <Stack space={4}>
            <Text variant="body">
              디자인 시스템의 가장 기초가 되는 시각적 요소들입니다.{" "}
              <Code>vars</Code> 객체를 통해 공통 스타일 값을 참조합니다.
            </Text>
            <Flex gap={4} flexWrap="wrap">
              <Surface
                tone="canvas"
                padding={6}
                borderRadius="md"
                style={{ flex: "1 1 250px" }}
              >
                <Stack space={3}>
                  <Text variant="bodyStrong">Semantic Colors</Text>
                  <Text variant="description" color="text">
                    역할 기반의 색상 시스템을 사용하여 일관된 사용자 경험을
                    제공합니다.
                  </Text>
                  <Flex gap={2}>
                    <Box
                      padding={2}
                      borderRadius="sm"
                      backgroundColor="primary"
                      style={{ border: `1px solid ${vars.color.border}` }}
                    />
                    <Box
                      padding={2}
                      borderRadius="sm"
                      backgroundColor="emphasis"
                      style={{ border: `1px solid ${vars.color.border}` }}
                    />
                    <Box
                      padding={2}
                      borderRadius="sm"
                      backgroundColor="highlight"
                      style={{ border: `1px solid ${vars.color.border}` }}
                    />
                  </Flex>
                </Stack>
              </Surface>
              <Surface
                tone="canvas"
                padding={6}
                borderRadius="md"
                style={{ flex: "1 1 250px" }}
              >
                <Stack space={3}>
                  <Text variant="bodyStrong">Typography</Text>
                  <Text variant="description" color="text">
                    고령층의 가독성을 위해 큰 폰트 크기와 명확한 위계를 가진
                    텍스트 스타일을 제공합니다.
                  </Text>
                </Stack>
              </Surface>
            </Flex>
          </Stack>
        </Section>

        {/* 2. Primitives Section */}
        <Section title="2. Primitives (Layout Units)">
          <Stack space={4}>
            <Text variant="body">
              레이아웃 구성을 위한 최소 단위의 프리미티브 컴포넌트입니다. 별도의
              CSS 작성 없이 Props만으로 기본적인 배치를 수행합니다.
            </Text>
            <Box padding={4} backgroundColor="device" borderRadius="md">
              <Stack space={3}>
                <Box>
                  <Code>Box</Code>: 모든 스타일 토큰(Padding, Background 등)을
                  지원하는 기본 컨테이너
                </Box>
                <Box>
                  <Code>Flex</Code>: Flexbox 레이아웃을 위한 수평/수직 배향
                  컨테이너
                </Box>
                <Box>
                  <Code>Grid</Code>: 격자 기반 배치를 위한 컨테이너
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Section>

        {/* 3. Layout Patterns Section */}
        <Section title="3. Design Patterns">
          <Stack space={4}>
            <Text variant="body">
              반복되는 레이아웃 구조를 추상화하여 구현 복잡도를 낮춘
              패턴들입니다.
            </Text>
            <Stack space={4}>
              <Surface tone="subtle" padding={5} borderRadius="md">
                <Stack space={2}>
                  <Text variant="bodyStrong">
                    <Code>Stack</Code>
                  </Text>
                  <Text variant="body">
                    요소들 사이의 일관된 수직 간격을 보장합니다. (
                    <Code>direction="column"</Code>의 단축형)
                  </Text>
                </Stack>
              </Surface>
              <Surface tone="subtle" padding={5} borderRadius="md">
                <Stack space={2}>
                  <Text variant="bodyStrong">
                    <Code>PageSection</Code>
                  </Text>
                  <Text variant="body">
                    페이지 내에서 중앙 정렬과 표준 여백을 가지는 주요 구획을
                    정의합니다.
                  </Text>
                </Stack>
              </Surface>
            </Stack>
          </Stack>
        </Section>

        {/* 4. Core Components Section */}
        <Section title="4. Core UI Components">
          <Stack space={4}>
            <Text variant="body">
              실제 서비스 기능 구현에 직접적으로 사용되는 고수준
              컴포넌트들입니다.
            </Text>
            <Grid
              gap={6}
              style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
            >
              <Stack space={3}>
                <Text variant="bodyStrong">Actions</Text>
                <Flex gap={2}>
                  <Button variant="primary">주요 작업</Button>
                  <Button variant="default">보조 작업</Button>
                </Flex>
                <Text variant="description">
                  직관적인 크기와 피드백을 제공하는 버튼 시스템
                </Text>
              </Stack>
              <Stack space={3}>
                <Text variant="bodyStrong">Visual Containers</Text>
                <Surface
                  tone="canvas"
                  padding={4}
                  borderRadius="md"
                  elevation="raised"
                >
                  <Text variant="description">Surface & Elevation</Text>
                </Surface>
                <Text variant="description">
                  정보의 계층 구조를 시각적으로 분리하는 컨테이너
                </Text>
              </Stack>
            </Grid>
          </Stack>
        </Section>

        {/* Summary Guide Section */}
        <Surface
          tone="canvas"
          padding={8}
          borderRadius="lg"
          elevation="raised"
          style={{ border: `1px solid ${vars.color.emphasis}` }}
        >
          <Stack space={5}>
            <Text variant="title">💡 개발 시 유의사항</Text>
            <Text variant="body">
              - 새로운 UI 구성을 위해 로컬 CSS를 작성하기 전에 먼저 프리미티브(
              <Code>Box</Code>, <Code>Flex</Code>)로 구현 가능한지 확인합니다.
              <br />- 모든 치수는 디자인 시스템의 <Code>vars.space</Code> 토큰을
              사용하여 4px 그리드 시스템을 준수합니다.
              <br />- 복잡한 로직이 포함되지 않은 순수 UI 컴포넌트는 디자인
              시스템 패키지에서 관리하는 것을 원칙으로 합니다.
            </Text>
            <AppLink href="/" variant="standout">
              메인 대시보드 화면 확인하기
            </AppLink>
          </Stack>
        </Surface>
      </Stack>
    </Box>
  );
}

const meta = {
  title: "Design System/Docs",
  component: DocsPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      // Canvas와 소스 코드를 완전히 숨겨 문서처럼 보이게 함
      canvas: { disable: true },
      source: { code: null },
    },
  },
} satisfies Meta<typeof DocsPage>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 디자인 시스템의 전반적인 가이드를 담은 기본 문서입니다.
 */
export const Docs: Story = {
  name: "Introduction",
};
