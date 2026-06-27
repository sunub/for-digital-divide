import { Flex } from "@internal/design-system/primitives";
import { useTransferStore } from "@/store/transfer/transfer-store";
import { AmountNumpad } from "./AmountNumpad";

export function AmountInputStep({ onNext }: { onNext: () => void }) {
  const { recipientName, recipientBank, recipientAccountNumber, transferAmount, setAmount } = useTransferStore();

  const handleInput = (val: string) => {
    setAmount(transferAmount + val);
  };

  const handleDelete = () => {
    setAmount(transferAmount.slice(0, -1));
  };

  const displayAmount = transferAmount 
    ? Number(transferAmount).toLocaleString() + " 원"
    : "얼마를 보낼까요?";

  return (
    <Flex direction="column" width="full" height="full" style={{ padding: '1rem', justifyContent: 'space-between' }}>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ color: '#666', marginBottom: '0.5rem' }}>
          {recipientBank} {recipientAccountNumber}
        </p>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          {recipientName} 님에게
        </h2>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '2rem 0', color: transferAmount ? '#000' : '#ccc' }}>
          {displayAmount}
        </div>
        <p style={{ color: '#888' }}>내 계좌 잔액: 1,500,000 원</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <AmountNumpad onInput={handleInput} onDelete={handleDelete} />
        <button
          onClick={onNext}
          disabled={!transferAmount || Number(transferAmount) <= 0}
          style={{
            padding: '1rem',
            backgroundColor: (!transferAmount || Number(transferAmount) <= 0) ? '#ccc' : '#0056b3',
            color: '#fff',
            borderRadius: '8px',
            fontWeight: 'bold',
            width: '100%'
          }}
        >
          완료
        </button>
      </div>
    </Flex>
  );
}
