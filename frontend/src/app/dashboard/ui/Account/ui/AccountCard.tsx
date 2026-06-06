"use client";

import {
  Button,
  Flex,
  InteractiveCard,
  Text,
} from "@for-digital-divide/design-system";
import { EllipsisVerticalIcon } from "lucide-react";
import { useState } from "react";
import { RollingNumberList } from "../../Dashboard/ui/RollingNumberList";
import * as style from "./AccountCard.css";

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
    <InteractiveCard>
      <Flex justifyContent="space-between" className={style.accountHeader}>
        <Flex direction="column" gap={1}>
          <Text as="h3" fontSize="1.25rem" fontWeight="black">
            KB나라사랑우대 {accountType}
          </Text>
          <Text
            as="p"
            fontSize="0.75rem"
            fontWeight="medium"
            className={style.accountNumber}
          >
            {accountNumber}
          </Text>
        </Flex>
        <Button
          className={style.moreOptionsButton}
          type="button"
          variant="transparent"
          size="icon"
          aria-label="계좌 옵션 더보기"
        >
          <EllipsisVerticalIcon size={32} />
        </Button>
      </Flex>
      <Flex direction="column" width="full" paddingTop={8} paddingBottom={5}>
        <Flex alignItems="center" gap={2}>
          <Flex alignItems="center" gap={1} className={style.accountBalance}>
            <RollingNumberList
              isDigitVisible={isHidden}
              value={formattedBalance}
              length={formattedBalance.length}
            />
            {isHidden ? null : (
              <Text as="span" fontSize="1rem" fontWeight="semibold">
                원
              </Text>
            )}
          </Flex>
          <Button
            className={style.hideNumberButton}
            type="button"
            variant="transparent"
            size="sm"
            onClick={() => setIsHidden(!isHidden)}
          >
            숨김
          </Button>
        </Flex>
      </Flex>
      <Button
        className={style.transferButton}
        type="button"
        variant="default"
        font="default"
        size="wide"
      >
        이체
      </Button>
    </InteractiveCard>
  );
}
