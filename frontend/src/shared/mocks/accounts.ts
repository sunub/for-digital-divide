export interface RecipientAccountDTO {
  account_number: string;
  user_id: number;
  account_type: string;
  balance: number;
  bank: string;
  user: {
    name: string;
    email: string;
  };
}

export const MOCK_ACCOUNTS: RecipientAccountDTO[] = [
  {
    account_number: "1234567890",
    user_id: 1,
    account_type: "CHECKING",
    balance: 1500000,
    bank: "하나은행",
    user: {
      name: "김하나",
      email: "hana@example.com",
    },
  },
  {
    account_number: "9876543210",
    user_id: 2,
    account_type: "SAVINGS",
    balance: 5000000,
    bank: "국민은행",
    user: {
      name: "이국민",
      email: "kookmin@example.com",
    },
  },
  {
    account_number: "1112223333",
    user_id: 3,
    account_type: "CHECKING",
    balance: 200000,
    bank: "기업은행",
    user: {
      name: "박기업",
      email: "ibk@example.com",
    },
  },
];
