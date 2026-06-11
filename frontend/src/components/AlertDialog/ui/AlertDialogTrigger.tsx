"use client";

import { NativeButtonProps } from "@internal/design-system/components";
import { Button } from "@internal/design-system/components";
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
