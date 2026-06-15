import { z } from "zod";
import type { McpTool } from "./types.js";
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
