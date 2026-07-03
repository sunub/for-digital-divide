"use server";

import { prisma } from "@root/prisma/prisma";

export interface VerifyRecipientAccountResult {
  success: boolean;
  name?: string;
  message?: string;
}

export async function verifyRecipientAccountAction(
  _bank: string,
  accountNumber: string,
): Promise<VerifyRecipientAccountResult> {
  try {
    const sanitizedAccountNumber = accountNumber.replace(/\D/g, "");
    if (!sanitizedAccountNumber) {
      return {
        success: false,
        message:
          "존재하지 않는 계좌번호입니다. (가이드의 예시 계좌를 참고해 주세요)",
      };
    }
    const accountNumberBigInt = BigInt(sanitizedAccountNumber);

    const account = await prisma.accounts.findUnique({
      where: {
        account_number: accountNumberBigInt,
      },
      include: {
        users: true,
      },
    });

    if (account) {
      return {
        success: true,
        name: account.users.name,
      };
    }

    return {
      success: false,
      message:
        "존재하지 않는 계좌번호입니다. (가이드의 예시 계좌를 참고해 주세요)",
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "계좌 조회 중 오류가 발생했습니다.";
    return {
      success: false,
      message: errorMessage || "계좌 조회 중 오류가 발생했습니다.",
    };
  }
}
