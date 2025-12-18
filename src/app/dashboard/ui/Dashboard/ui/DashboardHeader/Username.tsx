import { getUsername } from "../../utils/getUsername";
import * as style from "./DashboardHeader.css";

export async function Username() {
  const username = await getUsername();
  return (
    <p>
      <span className={style.username}>{username}</span>
    </p>
  );
}
