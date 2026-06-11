"use client";

import { Button, Text } from "@internal/design-system/components";
import { Flex } from "@internal/design-system/primitives";
import Link from "next/link";
import { AlertDialog, AlertDialogContent } from "@/components/AlertDialog";
import { AlertCloseButton } from "../../Alert/AlertCloseButton";

export function AlertMessage({ defaultOpen }: { defaultOpen: boolean }) {
  return (
    <AlertDialog defaultOpen={defaultOpen}>
      <AlertDialogContent>
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
        >
          <Text as={"h1"} variant={"title"}>
            간편 로그인을 등록해주세요!
          </Text>
          <Text
            as={"p"}
            variant={"body"}
            marginBottom={4}
            color={"descriptionText"}
          >
            간편 로그인 설정이 되어 있지 않습니다. PIN을 등록하면 이메일과
            비밀번호를 사용하지 않고 간편 로그인을 이용할 수 있습니다.
          </Text>
          <Flex width={"full"} gap={"1rem"} justifyContent="flex-end">
            <AlertCloseButton />
            <Button asChild>
              <Link href="/dashboard/register-pin" prefetch={false}>
                PIN 등록하기
              </Link>
            </Button>
          </Flex>
        </Flex>
      </AlertDialogContent>
    </AlertDialog>
  );
}
