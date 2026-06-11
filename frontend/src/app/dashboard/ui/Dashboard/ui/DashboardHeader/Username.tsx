import { Text } from "@internal/design-system/components";
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
