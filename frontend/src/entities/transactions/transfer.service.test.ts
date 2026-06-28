import { prisma } from "@root/prisma/prisma";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { InsufficientFundsException } from "@/shared/exceptions/transfer.exception";
import { transferService } from "./transfer.service";

describe("TransferService Integration Tests", () => {
  beforeAll(async () => {
    // 안전장치: 현재 연결된 DB 스키마가 test_db인지 확인하여 운영/로컬 개발 데이터 날림 방지
    const result = await prisma.$queryRaw<
      [{ current_schema: string }]
    >`SELECT current_schema()`;
    const currentSchema = result[0]?.current_schema;

    if (currentSchema !== "test_db") {
      throw new Error(
        `CRITICAL: Test is running against schema '${currentSchema}', not 'test_db'! Aborting to prevent data loss.`,
      );
    }
  });

  beforeEach(async () => {
    // 1. Clean up existing data (Teardown/Setup)
    // 외래 키 제약 조건으로 인해 자식 테이블부터 삭제합니다.
    await prisma.transactions.deleteMany();
    await prisma.accounts.deleteMany();
    await prisma.users.deleteMany();

    // 2. Seed Mock Data
    const userA = await prisma.users.create({
      data: { name: "Alice", email: "alice@test.com" },
    });
    const userB = await prisma.users.create({
      data: { name: "Bob", email: "bob@test.com" },
    });

    await prisma.accounts.create({
      data: {
        account_number: BigInt(1001),
        user_id: userA.user_id,
        balance: 100000,
      },
    });
    await prisma.accounts.create({
      data: {
        account_number: BigInt(1002),
        user_id: userB.user_id,
        balance: 0,
      },
    });
  });

  it("Tracer Bullet: 정상적인 송금 성공 시 두 계좌의 잔액이 변경되고 거래내역이 남는다", async () => {
    const fromAccount = BigInt(1001);
    const toAccount = BigInt(1002);
    const transferAmount = 30000;

    // Execute
    await transferService.executeTransfer(
      fromAccount,
      toAccount,
      transferAmount,
    );

    // Assert (검증)
    const senderAccount = await prisma.accounts.findUnique({
      where: { account_number: fromAccount },
    });
    const receiverAccount = await prisma.accounts.findUnique({
      where: { account_number: toAccount },
    });

    expect(Number(senderAccount?.balance)).toBe(70000); // 10만 - 3만
    expect(Number(receiverAccount?.balance)).toBe(30000); // 0 + 3만

    // 거래내역 검증
    const transactions = await prisma.transactions.findMany({
      orderBy: { transaction_id: "asc" },
    });

    expect(transactions).toHaveLength(2);

    // 출금 영수증 확인
    expect(transactions[0].transaction_type).toBe("TRANSFER_OUT");
    expect(Number(transactions[0].amount)).toBe(-30000);
    expect(transactions[0].account_number).toBe(fromAccount);

    // 입금 영수증 확인
    expect(transactions[1].transaction_type).toBe("TRANSFER_IN");
    expect(Number(transactions[1].amount)).toBe(30000);
    expect(transactions[1].account_number).toBe(toAccount);
  });

  it("잔액 부족 시 InsufficientFundsException을 발생시키고 데이터는 보존된다", async () => {
    const fromAccount = BigInt(1001);
    const toAccount = BigInt(1002);
    const transferAmount = 200000; // 잔액(10만)보다 큼

    // Execute & Assert Exception
    await expect(
      transferService.executeTransfer(fromAccount, toAccount, transferAmount),
    ).rejects.toThrow(InsufficientFundsException);

    // Assert (데이터 보존 검증 - Rollback 되었는지 확인)
    const senderAccount = await prisma.accounts.findUnique({
      where: { account_number: fromAccount },
    });
    expect(Number(senderAccount?.balance)).toBe(100000); // 돈이 빠져나가지 않아야 함

    const txCount = await prisma.transactions.count();
    expect(txCount).toBe(0); // 거래내역도 없어야 함
  });
});
