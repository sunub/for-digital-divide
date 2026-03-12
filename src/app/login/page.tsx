import { getAuthState } from "@/entities/auth/session.server";
import { Device } from "@/shared/layout";
import EmailPasswordLogin from "./email-password/page";
import { LoginContentContainer } from "./LoginContentContainer";
import { LoginSelection } from "./LoginSelection";
import { LoginPinPage } from "./Pin";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ method: string; reason?: string }>;
}) {
  const { method = "default", reason } = (await searchParams) || {};
  const { trustedDevice } = await getAuthState();
  const shouldRenderDefaultMethod = method === "pin" && !trustedDevice;

  return (
    <Device.Frame>
      <Device.Content>
        <LoginContentContainer
          searchParams={{
            method: shouldRenderDefaultMethod ? "default" : method,
            reason,
          }}
          defaultMethodNode={
            <LoginSelection hasPinLoginAvailable={Boolean(trustedDevice)} />
          }
          emailMethodNode={<EmailPasswordLogin />}
          pinMethodNode={<LoginPinPage />}
        />
      </Device.Content>
    </Device.Frame>
  );
}
