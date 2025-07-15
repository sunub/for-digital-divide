'use client';

import styled from 'styled-components';
import { EllipsisVerticalIcon } from 'lucide-react';
import { RollingNumberList } from '../../Dashboard/ui/RollingNumber';
import { Card } from './Card';

export default function AccountCard({
  accountNumber,
  balance,
  accountType,
}: {
  accountNumber: number;
  balance: number;
  accountType: string;
}) {
  const formattedBalance = String(balance)
    .split('')
    .reverse()
    .reduce((acc, digit, index) => {
      if (index > 0 && index % 3 === 0) {
        return `${digit},${acc}`;
      }
      return `${digit}${acc}`;
    }, '');

  return (
    <Card>
      <AccountHeader>
        <div>
          <AccountName>KB나라사랑우대 {accountType}</AccountName>
          <AccountNumber>{accountNumber}</AccountNumber>
        </div>
        <MoreOptionsButton>
          <EllipsisVerticalIcon size={32} />
        </MoreOptionsButton>
      </AccountHeader>
      <AccountBalanceContainer>
        <AccountBalanceWrapper>
          <AccountBalance>
            <RollingNumberList value={formattedBalance} />원
          </AccountBalance>
          <HideNumberButton>숨김</HideNumberButton>
        </AccountBalanceWrapper>
      </AccountBalanceContainer>
      <TransferButton>이체</TransferButton>
    </Card>
  );
}

const AccountHeader = styled.div`
  user-select: none;
  display: flex;
  justify-content: space-between;
`;

const AccountName = styled.div`
  font-size: 1.2rem;
  font-weight: 900;
`;

const AccountNumber = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: #666;
`;

const HideNumberButton = styled.button`
  height: fit-content;
  font-size: 0.75rem;
  font-weight: 300;
  padding: 5px 8px;
  border-radius: 8px;
  border: 1.5px solid oklch(76.64% 0.1304 292.01);
`;

const AccountBalanceContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 1.25rem;
`;

const AccountBalanceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const AccountBalance = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const TransferButton = styled.button`
  width: 100%;
  font-size: 1rem;
  font-weight: 300;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: var(--foreground-primary);
  background-color: color-mix(in oklch, #007bff 33%, oklch(76.64% 0.1304 292.01 / 14%));
`;

const MoreOptionsButton = styled.button`
  display: grid;
  place-items: center;
  width: 2rem;
  height: 100%;
`;
