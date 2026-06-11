import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";
import * as style from "./style/CardLayout.css";
import { actionNextStepGlow } from "@internal/design-system/style";

interface CardLayoutProps {
  children: ReactNode;
  href?: React.ComponentPropsWithoutRef<typeof Link>["href"];
  onPress?: () => void;
  prefetch?: boolean;
  disabled?: boolean;
}

function CardLayout({
  children,
  href,
  onPress,
  prefetch = true,
  disabled = false,
}: CardLayoutProps) {
  if (disabled || !href) {
    return (
      <button
        type="button"
        onClick={onPress}
        className={clsx(style.rootContainer, "card-link-wrapper")}
        aria-disabled={disabled}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      onClick={onPress}
      href={href}
      prefetch={prefetch}
      className={clsx(style.linkRootContainer, "card-link-wrapper")}
      tabIndex={0}
    >
      {children}
    </Link>
  );
}

export { CardLayout };
