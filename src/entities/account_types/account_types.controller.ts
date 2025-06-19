import { NextResponse } from "next/server";
import { accountTypesService } from "./account_types.service";
import { AccountCodeSchema, AccountTypeSchema } from "./account_types.model";

export async function getAccountTypeByCode(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const parsedCode = AccountCodeSchema.safeParse(code);
  if(!parsedCode.success) {
    return NextResponse.json(
      { error: "Invalid account type code format" },
      { status: 400 }
    );
  }

  if (!code) {
    return NextResponse.json(
      { error: "Account type code is required" },
      { status: 400 }
    );
  }

  try {
    const accountType = await accountTypesService.findByCode(parsedCode.data);
    if (!accountType) {
      return NextResponse.json(
        { error: "Account type not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(AccountTypeSchema.parse(accountType));
  } catch (error) {
    console.error("Error fetching account type by code:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
