"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { transferService } from "@/entities/transactions/transfer.service";

export interface ExecuteTransferResult {
  success: boolean;
  message?: string;
}

export async function executeTransferAction(
  fromAccountNumber: number,
  toAccountNumber: string,
  amount: number,
): Promise<ExecuteTransferResult> {
  try {
    const fromBigInt = BigInt(fromAccountNumber);
    const sanitizedToAccountNumber = toAccountNumber.replace(/\D/g, "");
    if (!sanitizedToAccountNumber) {
      return {
        success: false,
        message: "유효하지 않은 계좌번호입니다.",
      };
    }
    const toBigInt = BigInt(sanitizedToAccountNumber);

    await transferService.executeTransfer(fromBigInt, toBigInt, amount);

    revalidateTag("accounts");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "이체 처리 중 오류가 발생했습니다.";
    return {
      success: false,
      message: errorMessage || "이체 처리 중 오류가 발생했습니다.",
    };
  }
}
