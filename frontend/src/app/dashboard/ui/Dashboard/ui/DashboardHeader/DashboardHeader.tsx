import { PageFlexSection } from "@internal/design-system/patterns";
import { Flex } from "@internal/design-system/primitives";
import { LogOutIcon } from "lucide-react";
import { Suspense } from "react";
import { Tooltip } from "@/components/Tooltip";
import { logoutAction } from "../../utils/logoutAction";
import * as style from "./DashboardHeader.css";
import { Username } from "./Username";
import { UsernameSection } from "./UsernameSection";

export function DashboardHeader() {
  return (
    <PageFlexSection
      justifyContent={"space-between"}
      top={0}
      className={style.headerContainer}
    >
      <UsernameSection>
        <Suspense fallback={<div>Loading...</div>}>
          <Username />
        </Suspense>
      </UsernameSection>

      <Flex alignItems="center" justifyContent="center" gap={3}>
        <Tooltip.Trigger
          variant={"transparent"}
          className={style.logOutButton}
          onClick={logoutAction}
        >
          <LogOutIcon size={18} strokeWidth={3} />
        </Tooltip.Trigger>
        <Tooltip.Content>로그아웃</Tooltip.Content>
      </Flex>
    </PageFlexSection>
  );
}
