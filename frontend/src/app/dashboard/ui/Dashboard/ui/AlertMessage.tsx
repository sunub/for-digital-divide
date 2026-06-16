"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  Button,
} from "@internal/design-system/components";
import Link from "next/link";
import { AlertCloseButton } from "../../Alert/AlertCloseButton";

export function AlertMessage({ defaultOpen }: { defaultOpen: boolean }) {
  return (
    <AlertDialog defaultOpen={defaultOpen}>
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>간편 로그인을 등록해주세요!</AlertDialogTitle>
            <AlertDialogDescription>
              간편 로그인 설정이 되어 있지 않습니다. PIN을 등록하면 이메일과
              비밀번호를 사용하지 않고 간편 로그인을 이용할 수 있습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <AlertCloseButton />
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button asChild>
                <Link href="/dashboard/register-pin" prefetch={false}>
                  PIN 등록하기
                </Link>
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
}
