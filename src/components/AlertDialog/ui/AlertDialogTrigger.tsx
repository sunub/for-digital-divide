"use client";

import type { ButtonProps } from "@/components/Button";
import { Button } from "@/components/Button";
import { useAlertDialogContext } from "../hooks/useAlertDialogContext";
import * as style from "./Alert.css";

export const AlertDialogTrigger = ({
  ref,
  ...props
}: ButtonProps & { ref: React.Ref<HTMLButtonElement> }) => {
  const context = useAlertDialogContext();

  return (
    <Button
      ref={ref}
      className={style.alertDialogTrigger({
        state: context.open ? "open" : "closed",
      })}
      aria-haspopup="dialog"
      aria-expanded={context.open}
      aria-controls={context.contentId}
      data-state={context.open ? "open" : "closed"}
      onClick={context.onOpenToggle}
      {...props}
    />
  );
};

AlertDialogTrigger.displayName = "AlertDialogTrigger";
