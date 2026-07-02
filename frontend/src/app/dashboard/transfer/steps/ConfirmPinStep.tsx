import { Flex } from "@internal/design-system/primitives";
import { useDevice } from "@/shared/layout/ui/DeviceContext";
import { DeviceDrawer } from "@/shared/layout/ui/DeviceDrawer";
import { useTransferStore } from "@/store/transfer/transfer-store";

export function ConfirmPinStep({ onNext }: { onNext: () => void }) {
  const { recipientName, transferAmount } = useTransferStore();
  const { openDrawer, closeDrawer } = useDevice();

  const handleVerify = () => {
    // In a real app, this would verify the PIN using PinNumpad logic
    // For this educational simulator, we just simulate success
    closeDrawer();
    onNext();
  };

  return (
    <Flex
      direction="column"
      width="full"
      height="full"
      gap="1rem"
      style={{ padding: "1rem", justifyContent: "space-between" }}
    >
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>보낼 금액</p>
        <p
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          {Number(transferAmount).toLocaleString()}원
        </p>
      </div>

      <button
        type="button"
        onClick={openDrawer}
        style={{
          padding: "1.2rem",
          backgroundColor: "#0056b3",
          color: "#fff",
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        {recipientName} 님에게 이체
      </button>

      {/* Drawer for Simulated PIN Verification */}
      <DeviceDrawer>
        <Flex
          direction="column"
          gap="1rem"
          style={{ padding: "1rem", textAlign: "center" }}
        >
          <h3 style={{ marginBottom: "1rem" }}>비밀번호 6자리를 입력하세요</h3>
          <p style={{ color: "#888" }}>
            ※ 이 화면은 시뮬레이션입니다.
            <br />
            하단의 완료 버튼을 누르면 인증이 통과됩니다.
          </p>

          {/* We use a mock confirm here because reusing Pin.numpad requires NumpadContext and server-side keypad fetch (getKeypadData) which complicates the client-side funnel */}
          <button
            type="button"
            onClick={handleVerify}
            style={{
              padding: "1rem",
              backgroundColor: "#28a745",
              color: "#fff",
              borderRadius: "8px",
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          >
            [시뮬레이션] 비밀번호 인증 성공
          </button>
        </Flex>
      </DeviceDrawer>
    </Flex>
  );
}
