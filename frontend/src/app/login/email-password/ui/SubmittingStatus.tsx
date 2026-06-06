"use client";

import { Flex } from "@for-digital-divide/design-system";
import type { ActionState } from "../../types";
import { StatusLoader } from "./StatusLoader";

export function SubmittingStatus({
  actionState,
  isSubmitting,
  isPending,
  isSeedingProgress,
}: {
  actionState: ActionState;
  isSubmitting: boolean;
  isPending: boolean;
  isSeedingProgress?: boolean;
}) {
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"1rem"}
      width={"fullCqw"}
    >
      {isSubmitting ? (
        <>
          <StatusLoader
            actionState={actionState}
            isPending={isPending && actionState.status !== "continue"}
          >
            {isPending ? (
              <span>로그인 중...</span>
            ) : actionState.status === "continue" ? (
              <span>로그인 완료</span>
            ) : actionState.status === "error" ? (
              <span>로그인 실패</span>
            ) : (
              <span>로그인 중...</span>
            )}
          </StatusLoader>
          {!isPending &&
            isSeedingProgress &&
            actionState.status === "continue" && (
              <StatusLoader
                actionState={actionState}
                isPending={isSeedingProgress}
              >
                {isSeedingProgress ? (
                  <span>데모 데이터 주입 중...</span>
                ) : (
                  <span>주입 완료</span>
                )}
              </StatusLoader>
            )}
        </>
      ) : null}
    </Flex>
  );
}
