import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";
import * as style from "./style/CardLayout.css";

interface CardLayoutProps extends React.ComponentPropsWithoutRef<typeof Link> {
  children: ReactNode;
  hasDeviceId?: boolean;
}

function CardLayout({
  children,
  href,
  hasDeviceId = true,
  ...props
}: CardLayoutProps) {
  if (!hasDeviceId) {
    return (
      <div className={clsx(style.rootContainer, "card-link-wrapper")}>
        {children}
      </div>
    );
  }

  return (
    <Link
      {...props}
      href={href}
      prefetch={true}
      className={clsx(style.linkRootContainer, "card-link-wrapper")}
      tabIndex={0}
    >
      {children}
    </Link>
  );
}

export { CardLayout };
