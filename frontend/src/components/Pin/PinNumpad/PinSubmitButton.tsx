import { Button } from "@internal/design-system/components";
import type { FormStatus } from "react-dom";
import { StatusButton } from "@/components/StautsButton";
import { useNumpadStore } from "@/context/NumpadContext";
import * as style from "./PinNumpad.css";

export function PinSubmitButton({ status }: { status: FormStatus }) {
  const deleteNumpad = useNumpadStore((s) => s.deleteNumpad);

  return (
    <div className={style.actionButtons}>
      <Button
        type="submit"
        status={status.pending ? "pending" : "idle"}
        size={"wide"}
        variant={"default"}
        disabled={status.pending}
      >
        확인
      </Button>
      <Button
        type="button"
        variant={"destructive"}
        size={"wide"}
        onClick={deleteNumpad}
        aria-label="입력한 핀 번호 전체 삭제"
      >
        전체삭제
      </Button>
    </div>
  );
}
