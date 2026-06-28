import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocsPage } from "./components/DocsPage";

const meta = {
  title: "Design System/Docs",
  component: DocsPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      canvas: { disable: true },
      source: { code: null },
    },
  },
} satisfies Meta<typeof DocsPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {
  name: "Introduction",
};

