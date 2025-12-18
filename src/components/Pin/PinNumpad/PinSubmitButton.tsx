import type { FormStatus } from "react-dom";
import { Button } from "@/components/Button";
import { StatusButton } from "@/components/StautsButton";
import { useNumpadStore } from "@/context/NumpadContext";
import * as style from "./PinNumpad.css";

export function PinSubmitButton({ status }: { status: FormStatus }) {
  const deleteNumpad = useNumpadStore((s) => s.deleteNumpad);

  return (
    <div className={style.actionButtons}>
      <StatusButton
        type="submit"
        status={status.pending ? "pending" : "idle"}
        variant={"default"}
        disabled={status.pending}
      >
        확인
      </StatusButton>
      <Button
        type="button"
        variant={"destructive"}
        onClick={deleteNumpad}
        aria-label="입력한 핀 번호 전체 삭제"
      >
        전체삭제
      </Button>
    </div>
  );
}
