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
