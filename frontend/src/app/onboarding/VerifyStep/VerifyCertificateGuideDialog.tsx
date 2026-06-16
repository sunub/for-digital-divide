import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
} from "@internal/design-system/components";
import { AlertCloseButton } from "../../dashboard/ui/Alert/AlertCloseButton";

export function VerifyCertificateGuideDialog() {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>국민인증서 안내</AlertDialogTitle>
          <AlertDialogDescription>
            현재 데모 프로젝트에서는 <strong>휴대폰 인증</strong>을 통한 본인
            확인 방법을 안내하고 있습니다.
            <br />
            <br />
            확인 버튼을 누르신 후, <strong>휴대폰 인증</strong>을 선택해 본인
            확인 단계를 계속해 주세요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <AlertCloseButton />
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogPortal>
  );
}
