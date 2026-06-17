"use client";

import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import * as style from "./Alert.css";

// 1. Contexts
export const DevicePortalContext = createContext<HTMLDivElement | null>(null);

export interface AlertDialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  onOpenToggle: () => void;
  contentId: string;
}

export const AlertDialogContext = createContext<AlertDialogContextType>({
  open: false,
  setOpen: () => {},
  onOpenToggle: () => {},
  contentId: "alert-dialog-content",
});

export function useAlertDialogContext() {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error(
      "AlertDialog components must be rendered within an AlertDialog provider",
    );
  }
  return context;
}

// 2. AlertDialog (Root)
export interface AlertDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

export function AlertDialog({
  children,
  open: openProp,
  onOpenChange,
  defaultOpen = false,
}: AlertDialogProps) {
  const [openState, setOpenState] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : openState;

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setOpenState(value);
      }
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange],
  );

  const onOpenToggle = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      onOpenToggle,
      contentId: "alert-dialog-content",
    }),
    [open, setOpen, onOpenToggle],
  );

  return (
    <AlertDialogContext.Provider value={contextValue}>
      {children}
    </AlertDialogContext.Provider>
  );
}

// 3. AlertDialogTrigger
export interface AlertDialogTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function AlertDialogTrigger({
  asChild,
  children,
  onClick,
  className,
  ...props
}: AlertDialogTriggerProps) {
  const { open, setOpen } = useAlertDialogContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) {
      setOpen(true);
    }
  };

  const Component = asChild ? Slot : "button";

  return (
    <Component
      onClick={handleClick}
      className={clsx(
        !asChild &&
          style.alertDialogTrigger({ state: open ? "open" : "closed" }),
        className,
      )}
      aria-haspopup="dialog"
      aria-expanded={open}
      data-state={open ? "open" : "closed"}
      {...props}
    >
      {children}
    </Component>
  );
}

// 4. AlertDialogPortal
export interface AlertDialogPortalProps {
  children?: React.ReactNode;
}

export function AlertDialogPortal({ children }: { children: React.ReactNode }) {
  const { open } = useAlertDialogContext();
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const devicePortalElement = useContext(DevicePortalContext);

  useEffect(() => {
    if (devicePortalElement) {
      setPortalRoot(devicePortalElement);
    } else {
      const rootElement =
        document.getElementById("alertDialog-wrapper") || document.body;
      setPortalRoot(rootElement);
    }
  }, [devicePortalElement]);

  if (!open || !portalRoot) {
    return null;
  }

  const isGlobal =
    portalRoot === document.body || portalRoot.id === "alertDialog-wrapper";

  return createPortal(
    <div className={style.portalContainer({ isGlobal })}>{children}</div>,
    portalRoot,
  );
}

// 5. AlertDialogOverlay (Backdrop)
export interface AlertDialogOverlayProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function AlertDialogOverlay({
  className,
  ...props
}: AlertDialogOverlayProps) {
  const { open } = useAlertDialogContext();

  return (
    <div
      className={clsx(
        style.overlay({ state: open ? "open" : "closed" }),
        className,
      )}
      {...props}
    />
  );
}

// 6. AlertDialogContent (Body)
export interface AlertDialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function AlertDialogContent({
  children,
  className,
  ...props
}: AlertDialogContentProps) {
  const { open, setOpen, contentId } = useAlertDialogContext();
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, setOpen]);

  // Focus trap
  useEffect(() => {
    if (!open || !contentWrapperRef.current) return;

    const focusableElementsQuery =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';

    const contentWrapper = contentWrapperRef.current;
    const focusable = Array.from(
      contentWrapper.querySelectorAll(focusableElementsQuery),
    );

    if (focusable.length > 0) {
      (focusable[0] as HTMLElement).focus();
    }

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const activeElement = document.activeElement;
      const first = focusable[0] as HTMLElement;
      const last = focusable[focusable.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    contentWrapper.addEventListener("keydown", handleFocusTrap);
    return () => {
      contentWrapper.removeEventListener("keydown", handleFocusTrap);
    };
  }, [open]);

  return (
    <div
      className={clsx(
        style.content({ state: open ? "open" : "closed" }),
        className,
      )}
      ref={contentWrapperRef}
      role="alertdialog"
      id={contentId}
      aria-modal="true"
      tabIndex={-1}
      {...props}
    >
      {children}
    </div>
  );
}

// 7. Auxiliary components
export function AlertDialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(style.header, className)} {...props} />;
}

export function AlertDialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx(style.footer, className)} {...props} />;
}

export function AlertDialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={clsx(style.title, className)} {...props} />;
}

export function AlertDialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={clsx(style.description, className)} {...props} />;
}

// 8. Action and Cancel (trigger closing)
export interface AlertDialogActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function AlertDialogAction({
  asChild,
  children,
  onClick,
  ...props
}: AlertDialogActionProps) {
  const { setOpen } = useAlertDialogContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) {
      setOpen(false);
    }
  };

  const Component = asChild ? Slot : "button";

  return (
    <Component onClick={handleClick} {...props}>
      {children}
    </Component>
  );
}

export interface AlertDialogCancelProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function AlertDialogCancel({
  asChild,
  children,
  onClick,
  ...props
}: AlertDialogCancelProps) {
  const { setOpen } = useAlertDialogContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) {
      setOpen(false);
    }
  };

  const Component = asChild ? Slot : "button";

  return (
    <Component onClick={handleClick} {...props}>
      {children}
    </Component>
  );
}
