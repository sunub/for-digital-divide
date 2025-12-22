"use client";

import { EllipsisVerticalIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { RollingNumberList } from "../../Dashboard/ui/RollingNumberList";
import * as style from "./AccountCard.css";
import { Card } from "./Card";

export default function AccountCard({
  accountNumber,
  balance,
  accountType,
}: {
  accountNumber: number;
  balance: number;
  accountType: string;
}) {
  const [isHidden, setIsHidden] = useState(true);
  const formattedBalance = String(balance)
    .split("")
    .reverse()
    .reduce((acc, digit, index) => {
      if (index > 0 && index % 3 === 0) {
        return `${digit},${acc}`;
      }
      return `${digit}${acc}`;
    }, "");

  return (
    <Card>
      <div className={style.accountHeader}>
        <div>
          <div className={style.accountName}>KB나라사랑우대 {accountType}</div>
          <div className={style.accountNumber}>{accountNumber}</div>
        </div>
        <Button
          className={style.moreOptionsButton}
          type="button"
          variant="transparent"
        >
          <EllipsisVerticalIcon size={32} />
        </Button>
      </div>
      <div className={style.accountBalanceContainer}>
        <div className={style.accountBalanceWrapper}>
          <div className={style.accountBalance}>
            <RollingNumberList
              isDigitVisible={isHidden}
              value={formattedBalance}
              length={formattedBalance.length}
            />
            {isHidden ? null : <span>원</span>}
          </div>
          <Button
            className={style.hideNumberButton}
            type="button"
            variant="transparent"
            onClick={() => setIsHidden(!isHidden)}
          >
            숨김
          </Button>
        </div>
      </div>
      <Button className={style.transferButton} type="button" variant="default">
        이체
      </Button>
    </Card>
  );
}
