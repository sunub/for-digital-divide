import { beforeEach, describe, expect, it, vi } from "vitest";

function createSessionStorage(): Storage {
  const store = new Map<string, string>();

  return {
    get length(): number {
      return store.size;
    },
    clear: (): void => store.clear(),
    getItem: (key: string): string | null => store.get(key) ?? null,
    key: (index: number): string | null =>
      Array.from(store.keys())[index] ?? null,
    removeItem: (key: string): void => {
      store.delete(key);
    },
    setItem: (key: string, value: string): void => {
      store.set(key, value);
    },
  };
}

describe("useTransferStore", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal("sessionStorage", createSessionStorage());
  });

  it("stores the source account selected from the dashboard transfer button", async () => {
    const { useTransferStore } = await import("./transfer-store");

    useTransferStore.getState().setSourceAccount(123456789, "CHECKING", 50000);

    expect(useTransferStore.getState().sourceAccount).toEqual({
      accountNumber: 123456789,
      accountType: "CHECKING",
      balance: 50000,
    });
  });

  it("resets every persisted transfer state value", async () => {
    const { useTransferStore } = await import("./transfer-store");

    useTransferStore.getState().setSourceAccount(123456789, "CHECKING", 50000);
    useTransferStore.getState().setRecipient("홍길동", "국민은행", "987654321");
    useTransferStore.getState().setAmount("10000");
    useTransferStore.getState().setMemos("식비", "내 계좌 메모");

    useTransferStore.getState().resetTransfer();

    expect(useTransferStore.getState()).toMatchObject({
      sourceAccount: null,
      recipientName: "",
      recipientBank: "",
      recipientAccountNumber: "",
      selectedRecipientAccount: null,
      transferAmount: "",
      memoToRecipient: "",
      memoToMe: "",
    });
  });
});
