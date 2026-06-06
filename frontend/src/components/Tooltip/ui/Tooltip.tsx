import { TooltipContent } from "./TooltipContent";
import { TooltipProvider } from "./TooltipProvider";
import { TooltipTrigger } from "./TooltipTrigger";

export const Tooltip = {
  Provider: TooltipProvider,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
} as const;
