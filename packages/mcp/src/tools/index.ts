import { getThemeTokens } from "./get_theme_tokens.js";
import { searchComponents } from "./search_components.js";
import { getComponentDetail } from "./get_component_detail.js";
import { suggestSprinklesMatch } from "./suggest_sprinkles_match.js";
import { refreshMcpData } from "./refresh_mcp_data.js";
import type { McpTool } from "./types.js";
import type { z } from "zod";

const tools: Array<McpTool<z.ZodRawShape>> = [
  getThemeTokens as unknown as McpTool<z.ZodRawShape>,
  searchComponents as unknown as McpTool<z.ZodRawShape>,
  getComponentDetail as unknown as McpTool<z.ZodRawShape>,
  suggestSprinklesMatch as unknown as McpTool<z.ZodRawShape>,
  refreshMcpData as unknown as McpTool<z.ZodRawShape>,
];

export default tools;
