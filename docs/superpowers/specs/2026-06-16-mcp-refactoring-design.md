# Spec: MCP Refactoring - Modular Design System MCP Server

This specification outlines the refactoring of `packages/mcp` to modularize the bloated `index.ts` file, separating the server configuration, data loading logic, and individual tool definitions.

## Goal

To improve maintainability, testability, and code structure of `packages/mcp` by:
1. Moving data loading logic and path resolution to a centralized module (`src/data.ts`).
2. Splitting individual tools into dedicated files within a `src/tools/` directory.
3. Defining a clean, type-safe interface for tool registration.
4. Setting up the server in `src/server.ts` with correct, domain-specific instructions (replacing the leftover Obsidian boilerplate).
5. Keeping `src/index.ts` strictly as the entry point that initializes and runs the server.

---

## File Layout

After the refactoring, the file structure under `packages/mcp/src` will be as follows:

```
packages/mcp/src/
├── data.ts                  # Shared data loader and dynamic metadata refresh
├── index.ts                 # Entry point (connects and starts the server)
├── server.ts                # Server creation and tool registration
└── tools/
    ├── index.ts             # Exports list of all tools
    ├── types.ts             # Common types for type-safe tools
    ├── get_theme_tokens.ts  # Theme tokens query tool
    ├── search_components.ts # Design system component search tool
    ├── get_component_detail.ts # Component specification query tool
    ├── suggest_sprinkles_match.ts # Style-to-token suggestion tool
    └── refresh_mcp_data.ts  # Design system metadata build & reload tool
```

---

## Detailed Specifications

### 1. Data Access & Reloading (`src/data.ts`)

This module manages the design system metadata paths and exposes clean getter methods for the parsed data, preventing live-binding issues.

```typescript
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolved relative to output build/data.js (build output is in build/ directory)
const designSystemRoot = path.resolve(__dirname, "../../design-system");
const tokensPath = path.join(designSystemRoot, "dist/mcp-tokens.json");
const componentsPath = path.join(designSystemRoot, "dist/mcp-components.json");

let tokensData: any = {};
let componentsData: any = {};

export function loadData(): void {
  try {
    if (fs.existsSync(tokensPath)) {
      tokensData = JSON.parse(fs.readFileSync(tokensPath, "utf-8"));
    } else {
      console.error(`Tokens file not found at: ${tokensPath}`);
    }
    if (fs.existsSync(componentsPath)) {
      componentsData = JSON.parse(fs.readFileSync(componentsPath, "utf-8"));
    } else {
      console.error(`Components file not found at: ${componentsPath}`);
    }
  } catch (error) {
    console.error("Error loading design system metadata:", error);
  }
}

// Initial load on import
loadData();

export const designSystemData = {
  get tokens() {
    return tokensData;
  },
  get components() {
    return componentsData;
  },
  get designSystemRoot() {
    return designSystemRoot;
  }
};
```

---

### 2. Tool Types (`src/tools/types.ts`)

Ensures all tools conform to a strict type-safe structure.

```typescript
import { z } from "zod";

export interface McpTool<T extends z.ZodRawShape> {
  name: string;
  schema: T;
  description?: string;
  handler: (args: z.infer<z.ZodObject<T>>) => Promise<{
    isError?: boolean;
    content: Array<{
      type: "text";
      text: string;
    }>;
  }>;
}
```

---

### 3. Individual Tools (`src/tools/*.ts`)

Each tool will be moved to its own file.

* `get_theme_tokens.ts`
* `search_components.ts`
* `get_component_detail.ts`
* `suggest_sprinkles_match.ts`
* `refresh_mcp_data.ts` (this tool runs `pnpm build:mcp` inside the design system root directory and triggers `loadData()` on `src/data.ts`).

Example definition for `get_theme_tokens.ts`:
```typescript
import { z } from "zod";
import { McpTool } from "./types.js";
import { designSystemData, loadData } from "../data.js";

export const getThemeTokens: McpTool<{
  category: z.ZodOptional<z.ZodEnum<[string, ...string[]]>>;
}> = {
  name: "get_theme_tokens",
  schema: {
    category: z
      .enum([
        "color",
        "space",
        "fontSize",
        "borderRadius",
        "zIndex",
        "size",
        "layout",
      ])
      .optional(),
  },
  handler: async ({ category }) => {
    loadData(); // Ensure fresh data
    const tokens = designSystemData.tokens;
    if (category) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(tokens[category] || {}, null, 2),
          },
        ],
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(tokens, null, 2) }],
    };
  },
};
```

---

### 4. Server Configuration (`src/server.ts`)

Configures `McpServer` and loops over all defined tools to register them.

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import tools from "./tools/index.js";

export default function createMcpServer(): McpServer {
  const server = new McpServer(
    {
      name: "my-design-system",
      version: "1.0.0",
    },
    {
      instructions: `
This server provides access to design system tokens and component metadata.

Available tools:
- get_theme_tokens: Retrieve theme tokens (colors, spacing, sizes, etc.).
- search_components: Search for components in the design system.
- get_component_detail: Retrieve details for a specific component.
- suggest_sprinkles_match: Suggest Vanilla-Extract Sprinkles mappings for CSS styles.
- refresh_mcp_data: Trigger a rebuild and reload of MCP design system metadata.
      `,
    }
  );

  // Register all modular tools
  for (const tool of tools) {
    server.tool(tool.name, tool.schema, tool.handler);
  }

  return server;
}
```

---

### 5. Entry Point (`src/index.ts`)

Connects the server to the transport.

```typescript
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import createMcpServer from "./server.js";

async function runServer() {
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Design System MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
```

---

## Verification Plan

### Automated Tests
- Run `pnpm test` (which triggers `node test_mcp.js`) under `packages/mcp` to ensure all 5 tools register and function identically to their pre-refactored state.
- Ensure the TypeScript code compiles successfully by running `pnpm build` in `packages/mcp`.
