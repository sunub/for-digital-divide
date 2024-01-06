import React from "react";
import * as Styled from "./AccountCard.style";
import useToggle from "@/hooks/use-toggle";

function AccountCard() {
  const [accountBuffer, setAccountBuffer] = React.useState<any[]>([
    {
      name: "1",
      accountNumber: "426402-02-133421",
      price: "216,9180원",
      ref: React.useRef<HTMLDivElement>(null),
    },
    {
      name: "2",
      accountNumber: "426402-02-133421",
      price: "216,9180원",
      ref: React.useRef<HTMLDivElement>(null),
    },
    {
      name: "3",
      accountNumber: "426402-02-133421",
      price: "216,9180원",
      ref: React.useRef<HTMLDivElement>(null),
    },
  ]);
  const [scrollDirection, setScrollDirection] = React.useState<
    "left" | "right" | null
  >(null);
  const [startPosition, setStartPosition] = React.useState<number>(0);
  const [isMouseDown, toggleMouseDown] = useToggle(false);
  const [currPosition, setCurrPosition] = React.useState<number>(1);

  React.useEffect(() => {
    const middle = Math.floor(accountBuffer.length / 2);
    if (accountBuffer[middle].ref) {
      const ref = accountBuffer[middle].ref.current as HTMLDivElement;

      ref.scrollIntoView({ behavior: "instant" });
    }
  }, [accountBuffer]);

  React.useEffect(() => {
    function handleMouseUp(e: MouseEvent) {
      if (!isMouseDown) {
        return;
      }

      if (e.clientX < startPosition) {
        setScrollDirection("right");
        setCurrPosition((prev) => {
          const nextPosition = prev + 1;
          return nextPosition % accountBuffer.length;
        });
        toggleMouseDown();
      } else if (e.clientX > startPosition) {
        setScrollDirection("left");
        setCurrPosition((prev) => {
          const nextPosition = accountBuffer.length + prev - 1;
          return nextPosition % accountBuffer.length;
        });
        toggleMouseDown();
      }
    }

    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [isMouseDown, startPosition, accountBuffer, toggleMouseDown]);

  React.useEffect(() => {
    const nextPosition = Math.abs(currPosition);
    if (accountBuffer[nextPosition].ref) {
      const ref = accountBuffer[nextPosition].ref.current as HTMLDivElement;
      ref.scrollIntoView({ behavior: "smooth" });
    }
  }, [currPosition, accountBuffer]);

  return (
    <Styled.Wrapper>
      <Styled.CardWrapper
        onMouseDown={(e) => {
          toggleMouseDown();
          setStartPosition(() => e.clientX);
        }}
      >
        {accountBuffer.map((account, i) => (
          <Styled.Card key={`${i}th-account-card`} ref={account.ref}>
            <header>
              <h3>{account.name}</h3>
              <span>{account.accountNumber}</span>
            </header>
            <main>{account.price}</main>
            <button>입금</button>
          </Styled.Card>
        ))}
      </Styled.CardWrapper>
    </Styled.Wrapper>
  );
}

export default AccountCard;
