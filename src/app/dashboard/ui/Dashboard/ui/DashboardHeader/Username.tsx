import { Text } from "@for-digital-divide/design-system";
import { getUsername } from "../../utils/getUsername";

export async function Username() {
  const username = await getUsername();
  return (
    <p>
      <Text as={"span"} variant={"bodyStrong"}>
        {username}
      </Text>
    </p>
  );
}
