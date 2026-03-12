import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      expanded: true,
      sort: "alpha",
    },
    options: {
      storySort: {
        order: ["Overview", "Foundations", "Primitives", "Components"],
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
