import clsx from "clsx";
import * as style from "./style/SmallCard.css";

export function SmallCard({ hasDeviceId = true }: { hasDeviceId?: boolean }) {
  return <div className={clsx(style.smallCard({ hasDeviceId }))} />;
}
