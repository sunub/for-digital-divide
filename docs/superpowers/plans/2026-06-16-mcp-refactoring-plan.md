# MCP Refactoring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `packages/mcp` to modularize the server setup, data loader, and tool definitions, separating them from `index.ts` into individual files.

**Architecture:** Split data loading to `src/data.ts`, types to `src/tools/types.ts`, each of the 5 tools into `src/tools/*.ts`, initialize and configure the server in `src/server.ts` with updated guidelines, and connect/start the server from `src/index.ts`.

**Tech Stack:** Node.js, TypeScript, @modelcontextprotocol/sdk, Zod.

---

### Task 1: Create types and shared data loader

**Files:**
- Create: `packages/mcp/src/tools/types.ts`
- Create: `packages/mcp/src/data.ts`

- [ ] **Step 1: Write `packages/mcp/src/tools/types.ts`**
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

- [ ] **Step 2: Write `packages/mcp/src/data.ts`**
  ```typescript
  import path from "path";
  import fs from "fs";
  import { fileURLToPath } from "url";

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

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

  // Initial load
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

- [ ] **Step 3: Verify TypeScript compilation of data.ts**
  Run: `pnpm --filter mcp build`
  Expected: Success without errors.

---

### Task 2: Create individual tool modules

**Files:**
- Create: `packages/mcp/src/tools/get_theme_tokens.ts`
- Create: `packages/mcp/src/tools/search_components.ts`
- Create: `packages/mcp/src/tools/get_component_detail.ts`
- Create: `packages/mcp/src/tools/suggest_sprinkles_match.ts`
- Create: `packages/mcp/src/tools/refresh_mcp_data.ts`

- [ ] **Step 1: Write `packages/mcp/src/tools/get_theme_tokens.ts`**
  ```typescript
  import { z } from "zod";
  import { McpTool } from "./types.js";
  import { designSystemData, loadData } from "../data.js";

  export const getThemeTokens: McpTool<{
    category: z.ZodOptional<z.ZodEnum<["color", "space", "fontSize", "borderRadius", "zIndex", "size", "layout"]>>;
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
      loadData();
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

- [ ] **Step 2: Write `packages/mcp/src/tools/search_components.ts`**
  ```typescript
  import { z } from "zod";
  import { McpTool } from "./types.js";
  import { designSystemData, loadData } from "../data.js";

  export const searchComponents: McpTool<{
    query: z.ZodOptional<z.ZodString>;
  }> = {
    name: "search_components",
    schema: {
      query: z.string().optional(),
    },
    handler: async ({ query }) => {
      loadData();
      const components = designSystemData.components;
      const results: any[] = [];
      const q = query ? query.toLowerCase() : "";

      for (const name in components) {
        const comp = components[name];
        const matchesQuery =
          !q ||
          name.toLowerCase().includes(q) ||
          (comp.description && comp.description.toLowerCase().includes(q));

        if (matchesQuery) {
          results.push({
            name: comp.name,
            description: comp.description,
            importPath: comp.importPath,
          });
        }
      }

      return {
        content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
      };
    },
  };
  ```

- [ ] **Step 3: Write `packages/mcp/src/tools/get_component_detail.ts`**
  ```typescript
  import { z } from "zod";
  import { McpTool } from "./types.js";
  import { designSystemData, loadData } from "../data.js";

  export const getComponentDetail: McpTool<{
    name: z.ZodString;
  }> = {
    name: "get_component_detail",
    schema: {
      name: z.string(),
    },
    handler: async ({ name }) => {
      loadData();
      const components = designSystemData.components;
      const comp = components[name];
      if (!comp) {
        return {
          isError: true,
          content: [{ type: "text", text: `Component "${name}" not found.` }],
        };
      }
      return {
        content: [{ type: "text", text: JSON.stringify(comp, null, 2) }],
      };
    },
  };
  ```

- [ ] **Step 4: Write `packages/mcp/src/tools/suggest_sprinkles_match.ts`**
  ```typescript
  import { z } from "zod";
  import { McpTool } from "./types.js";
  import { designSystemData, loadData } from "../data.js";

  export const suggestSprinklesMatch: McpTool<{
    style: z.ZodRecord<z.ZodString, z.ZodAny>;
  }> = {
    name: "suggest_sprinkles_match",
    schema: {
      style: z.record(z.string(), z.any()),
    },
    handler: async ({ style }) => {
      loadData();
      const tokens = designSystemData.tokens;
      const suggestions: Record<string, any> = {};
      const explanations: string[] = [];

      function findToken(category: string, value: any): string | null {
        const catObj = tokens[category];
        if (!catObj) return null;

        const valStr = String(value).trim().toLowerCase();

        for (const key in catObj) {
          const catVal = String(catObj[key]).trim().toLowerCase();
          if (catVal === valStr) {
            return key;
          }
        }
        return null;
      }

      for (const [prop, val] of Object.entries(style)) {
        if (prop === "color" || prop === "backgroundColor" || prop === "bg") {
          const matchedToken = findToken("color", val);
          if (matchedToken) {
            const targetProp =
              prop === "bg" ? "bg" : prop === "backgroundColor" ? "bg" : "color";
            suggestions[targetProp] = matchedToken;
            explanations.push(
              `Matched style '${prop}: ${val}' to color token '${matchedToken}'`
            );
          } else {
            suggestions[prop] = val;
            explanations.push(
              `No exact color token match found for '${prop}: ${val}'`
            );
          }
        }
        else if (
          [
            "padding",
            "paddingTop",
            "paddingBottom",
            "paddingLeft",
            "paddingRight",
            "margin",
            "marginTop",
            "marginBottom",
            "marginLeft",
            "marginRight",
            "p",
            "px",
            "py",
            "m",
            "mx",
            "my",
            "gap",
          ].includes(prop)
        ) {
          const matchedToken = findToken("space", val);
          if (matchedToken) {
            let targetProp = prop;
            if (prop === "padding") targetProp = "p";
            else if (prop === "margin") targetProp = "m";

            suggestions[targetProp] = matchedToken;
            explanations.push(
              `Matched style '${prop}: ${val}' to space token '${matchedToken}'`
            );
          } else if (
            val === "auto" &&
            ["margin", "marginLeft", "marginRight", "mx", "my"].includes(prop)
          ) {
            suggestions[prop] = "auto";
            explanations.push(`Kept margin auto value`);
          } else {
            suggestions[prop] = val;
            explanations.push(
              `No exact space token match found for '${prop}: ${val}'`
            );
          }
        }
        else {
          suggestions[prop] = val;
        }
      }

      if (
        suggestions["paddingLeft"] &&
        suggestions["paddingRight"] &&
        suggestions["paddingLeft"] === suggestions["paddingRight"]
      ) {
        suggestions["px"] = suggestions["paddingLeft"];
        delete suggestions["paddingLeft"];
        delete suggestions["paddingRight"];
      }
      if (
        suggestions["paddingTop"] &&
        suggestions["paddingBottom"] &&
        suggestions["paddingTop"] === suggestions["paddingBottom"]
      ) {
        suggestions["py"] = suggestions["paddingTop"];
        delete suggestions["paddingTop"];
        delete suggestions["paddingBottom"];
      }
      if (
        suggestions["marginLeft"] &&
        suggestions["marginRight"] &&
        suggestions["marginLeft"] === suggestions["marginRight"]
      ) {
        suggestions["mx"] = suggestions["marginLeft"];
        delete suggestions["marginLeft"];
        delete suggestions["marginRight"];
      }
      if (
        suggestions["marginTop"] &&
        suggestions["marginBottom"] &&
        suggestions["marginTop"] === suggestions["marginBottom"]
      ) {
        suggestions["my"] = suggestions["marginTop"];
        delete suggestions["marginTop"];
        delete suggestions["marginBottom"];
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ suggestions, explanations }, null, 2),
          },
        ],
      };
    },
  };
  ```

- [ ] **Step 5: Write `packages/mcp/src/tools/refresh_mcp_data.ts`**
  ```typescript
  import { execSync } from "child_process";
  import { McpTool } from "./types.js";
  import { designSystemData, loadData } from "../data.js";

  export const refreshMcpData: McpTool<Record<string, never>> = {
    name: "refresh_mcp_data",
    schema: {},
    handler: async () => {
      try {
        const root = designSystemData.designSystemRoot;
        console.log(`Running build:mcp in ${root}...`);
        execSync("pnpm build:mcp", { cwd: root });

        // Reload datasets
        loadData();

        return {
          content: [
            {
              type: "text",
              text: "MCP metadata generated and reloaded successfully!",
            },
          ],
        };
      } catch (error: any) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Failed to refresh MCP metadata: ${error.message}`,
            },
          ],
        };
      }
    },
  };
  ```

---

### Task 3: Export tools from index

**Files:**
- Modify: `packages/mcp/src/tools/index.ts`

- [ ] **Step 1: Write `packages/mcp/src/tools/index.ts`**
  ```typescript
  import { getThemeTokens } from "./get_theme_tokens.js";
  import { searchComponents } from "./search_components.js";
  import { getComponentDetail } from "./get_component_detail.js";
  import { suggestSprinklesMatch } from "./suggest_sprinkles_match.js";
  import { refreshMcpData } from "./refresh_mcp_data.js";

  const tools: Array<any> = [
    getThemeTokens,
    searchComponents,
    getComponentDetail,
    suggestSprinklesMatch,
    refreshMcpData,
  ];

  export default tools;
  ```

- [ ] **Step 2: Verify compiling of tools directory**
  Run: `pnpm --filter mcp build`
  Expected: Success.

---

### Task 4: Setup server configuration

**Files:**
- Modify: `packages/mcp/src/server.ts`

- [ ] **Step 1: Write `packages/mcp/src/server.ts`**
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

### Task 5: Configure entry point index.ts

**Files:**
- Modify: `packages/mcp/src/index.ts`

- [ ] **Step 1: Overwrite `packages/mcp/src/index.ts`**
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

### Task 6: Build and Test Verification

**Files:**
- Test: `packages/mcp/test_mcp.js`

- [ ] **Step 1: Build the packages/mcp package**
  Run: `pnpm --filter mcp build`
  Expected: Success with no build errors.

- [ ] **Step 2: Run the test suite**
  Run: `pnpm --filter mcp test`
  Expected: All 5 integration tests pass with expected JSON-RPC outputs.
