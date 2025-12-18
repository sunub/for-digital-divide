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

  return (
    <Device.frame>
      <Device.content>
        <LoginContentContainer
          searchParams={{ method, reason }}
          defaultMethodNode={<LoginSelection />}
          emailMethodNode={<EmailPasswordLogin />}
          pinMethodNode={<LoginPinPage />}
        />
      </Device.content>
    </Device.frame>
  );
}
