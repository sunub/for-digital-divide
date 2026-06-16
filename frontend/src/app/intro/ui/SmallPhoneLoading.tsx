import { Loading } from "@internal/design-system/components";
import { loadingContainer } from "./SmallPhone.css";

export function SmallPhoneLoading({ isOpen }: { isOpen: boolean }) {
  return (
    <>
      {isOpen && (
        <div className={loadingContainer}>
          <Loading />
        </div>
      )}
    </>
  );
}
