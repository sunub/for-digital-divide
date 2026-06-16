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
import { AlertCloseButton } from "@/app/dashboard/ui/Alert/AlertCloseButton";

interface DemoNoticeDialogProps {
  title: string;
}

export function DemoNoticeDialog({ title }: DemoNoticeDialogProps) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title} 안내</AlertDialogTitle>
          <AlertDialogDescription>
            현재 데모 버전에서는 <strong>휴대폰 인증</strong>을 이용해 주시기
            바랍니다.
            <br />
            <br />
            확인 버튼을 누르신 후, 아래의 <strong>휴대폰인증</strong> 버튼을
            클릭해 주세요.
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
