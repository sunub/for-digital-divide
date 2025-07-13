import { TooltipContent } from './TooltipContent';
import { TooltipProvider } from './TooltipProvider';
import { TooltipTrigger } from './TooltipTrigger';

export function Tooltip({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}

Tooltip.displayName = 'Tooltip';

Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;
