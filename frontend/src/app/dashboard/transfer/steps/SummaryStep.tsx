import { Flex } from "@internal/design-system/primitives";
import { useTransferStore } from "@/store/transfer/transfer-store";

export function SummaryStep({ onNext }: { onNext: () => void }) {
  const {
    recipientName,
    recipientBank,
    recipientAccountNumber,
    transferAmount,
    memoToRecipient,
    memoToMe,
    setMemos,
  } = useTransferStore();

  return (
    <Flex
      direction="column"
      width="full"
      gap="1rem"
      style={{ padding: "1rem" }}
    >
      <h2
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        최종 확인
      </h2>

      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "1.5rem",
          borderRadius: "12px",
        }}
      >
        <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
          <strong>{recipientName}</strong> 님에게
        </p>
        <p
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}
        >
          {Number(transferAmount).toLocaleString()}원
        </p>
        <p style={{ color: "#666" }}>
          {recipientBank} {recipientAccountNumber}
        </p>
        <p style={{ color: "#888", marginTop: "1rem", fontSize: "0.9rem" }}>
          출금 계좌 잔액: 1,500,000 원
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginTop: "1rem",
        }}
      >
        <label
          htmlFor="memo-to-recipient"
          style={{ fontSize: "0.9rem", color: "#666" }}
        >
          받는 분에게 표시
        </label>
        <input
          id="memo-to-recipient"
          type="text"
          value={memoToRecipient}
          onChange={(e) => setMemos(e.target.value, memoToMe)}
          placeholder={recipientName}
          style={{
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label
          htmlFor="memo-to-me"
          style={{ fontSize: "0.9rem", color: "#666" }}
        >
          나에게 표시
        </label>
        <input
          id="memo-to-me"
          type="text"
          value={memoToMe}
          onChange={(e) => setMemos(memoToRecipient, e.target.value)}
          placeholder={recipientName}
          style={{
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />
      </div>

      <button
        type="button"
        onClick={onNext}
        style={{
          padding: "1rem",
          backgroundColor: "#0056b3",
          color: "#fff",
          borderRadius: "8px",
          fontWeight: "bold",
          marginTop: "2rem",
        }}
      >
        다음
      </button>
    </Flex>
  );
}
