import { Loading } from "@/components/Loading";
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
