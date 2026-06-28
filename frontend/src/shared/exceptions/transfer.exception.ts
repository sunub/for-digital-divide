export class TransferException extends Error {
  public readonly code: string;
  public readonly status: number;

  constructor(
    message: string,
    code: string = "TRANSFER_ERROR",
    status: number = 400,
  ) {
    super(message);
    this.name = "TransferException";
    this.code = code;
    this.status = status;
  }
}

export class InsufficientFundsException extends TransferException {
  constructor(message: string = "잔액이 부족합니다.") {
    super(message, "INSUFFICIENT_FUNDS", 400);
    this.name = "InsufficientFundsException";
  }
}

export class AccountNotFoundException extends TransferException {
  constructor(message: string = "계좌를 찾을 수 없습니다.") {
    super(message, "ACCOUNT_NOT_FOUND", 404);
    this.name = "AccountNotFoundException";
  }
}
