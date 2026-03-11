"use client";

import { Button } from "@for-digital-divide/design-system";
import type { NativeButtonProps } from "@for-digital-divide/design-system";
import { useAlertDialogContext } from "../hooks/useAlertDialogContext";
import * as style from "./Alert.css";

export const AlertDialogTrigger = ({
  ref,
  ...props
}: NativeButtonProps & { ref: React.Ref<HTMLButtonElement> }) => {
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
