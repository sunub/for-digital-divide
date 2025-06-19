import { z } from 'zod';

export const TRNASACTION_CODES = [
  'ADJUSTMENT',
  'DEPOSIT',
  'FEE',
  'INTEREST',
  'PAYMENT',
  'REFUND',
  'REVERSAL',
  'TRANSFER',
  'WITHDRAWAL',
] as const;

export const TRANSACTION_NAMES = [
  '장부조정',
  '입금',
  '수수료',
  '이자',
  '결제',
  '환불',
  '취소',
  '이체',
  '출금',
] as const;

export const TransactionTypeNameMap: Record<TransactionTypeCode, TransactionTypeName> = {
  'ADJUSTMENT': '장부조정',
  'DEPOSIT': '입금',
  'FEE': '수수료',
  'INTEREST': '이자',
  'PAYMENT': '결제',
  'REFUND': '환불',
  'REVERSAL': '취소',
  'TRANSFER': '이체',
  'WITHDRAWAL': '출금',
}

export const TransactionTypeCodeSchema = z.enum(TRNASACTION_CODES);
export type TransactionTypeCode = z.infer<typeof TransactionTypeCodeSchema>;

export const TransactionTypeNameSchema = z.enum(TRANSACTION_NAMES);
export type TransactionTypeName = z.infer<typeof TransactionTypeNameSchema>;

export type TransactionType = z.infer<typeof TransactionTypeSchema>;

export const TransactionTypeSchema = z.object({
  code: TransactionTypeCodeSchema,
  name: TransactionTypeNameSchema,
  note: z.string().max(255).optional(),
});

// code, name, note
// ADJUSTMENT	장부조정	내부 오류 보정용 임시 조정
// DEPOSIT	입금	고객 계좌에 현금 또는 수표 입금
// FEE	수수료	이체 수수료·계좌 유지비 등
// INTEREST	이자	예·적금 이자 지급
// PAYMENT	결제	자동이체·카드 결제·공과금 납부
// REFUND	환불	과오납 회수 등 입금성 환불
// REVERSAL	취소	승인 취소·거래 취소
// TRANSFER	이체	계좌 간(내·외부) 이체
// WITHDRAWAL	출금	현금 인출 또는 출금 처리
