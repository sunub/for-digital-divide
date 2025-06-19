import { NextResponse } from "next/server";
import { transactionTypeRepository } from "./transaction_types.repository"
import { TransactionTypeCodeSchema, TransactionTypeSchema } from "./transaction_types.model"

export async function transactionTypesController(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const parsedTypeCode = TransactionTypeCodeSchema.safeParse({ code });
  if(!parsedTypeCode.success) {
    return NextResponse.json(
      { error: "Invalid transaction type code format" },
      { status: 400 }
    );
  }

  try {
    const transactionType = await transactionTypeRepository.findByCode(parsedTypeCode.data);
    if (!transactionType) {
      return NextResponse.json(
        { error: "Transaction type not found" },
        { status: 404 }
      );
    }

    const parsedTransactionType = TransactionTypeSchema.safeParse(transactionType);
    if (!parsedTransactionType.success) {
      return NextResponse.json(
        { error: "Invalid transaction type data format" },
        { status: 500 }
      );
    }

    return NextResponse.json(parsedTransactionType.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching transaction type by code:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
