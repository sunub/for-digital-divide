import * as style from "./style/SmallCard.css";

export function SmallCard({ hasDeviceId = true }: { hasDeviceId?: boolean }) {
  return <div className={style.smallCard({ hasDeviceId })} />;
}
