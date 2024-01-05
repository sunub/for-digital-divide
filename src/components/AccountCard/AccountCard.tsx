import React from "react";
import * as Styled from "./AccountCard.style";
import useToggle from "@/hooks/use-toggle";

function AccountCard() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [accountBuffer, setAccountBuffer] = React.useState<any[]>([
    {
      name: "1",
      accountNumber: "426402-02-133421",
      price: "216,9180원",
    },
    {
      name: "2",
      accountNumber: "426402-02-133421",
      price: "216,9180원",
    },
    {
      name: "3",
      accountNumber: "426402-02-133421",
      price: "216,9180원",
    },
  ]);
  const [scrollDirection, setScrollDirection] = React.useState<
    "left" | "right" | null
  >(null);
  const [startPosition, setStartPosition] = React.useState<number>(0);
  const [isMouseDown, toggleMouseDown] = useToggle(false);

  React.useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "instant" });
  }, []);

  React.useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!isMouseDown) {
        return; // Add this line
      }

      if (e.clientX > startPosition) {
        setScrollDirection("right");
      } else if (e.clientX < startPosition) {
        setScrollDirection("left");
      }
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMouseDown, startPosition]);

  React.useEffect(() => {
    function handleMouseUp() {
      console.log("mouseup");
      toggleMouseDown();
    }

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [toggleMouseDown]);

  console.log(scrollDirection);

  return (
    <Styled.Wrapper>
      <Styled.CardWrapper
        onMouseDown={(e) => {
          toggleMouseDown();
          setStartPosition(() => e.clientX);
        }}
      >
        <Styled.Card>
          <header>
            <h3>{1}</h3>
            {"426402-02-133421"}
          </header>
          <main>{"216,9180원"}</main>
          <button>입금</button>
        </Styled.Card>
        <Styled.Card ref={ref}>
          <header>
            <h3>{2}</h3>
            {"426402-02-133421"}
          </header>
          <main>{"216,9180원"}</main>
          <button>입금</button>
        </Styled.Card>
        <Styled.Card>
          <header>
            <h3>{3}</h3>
            {"426402-02-133421"}
          </header>
          <main>{"216,9180원"}</main>
          <button>입금</button>
        </Styled.Card>
      </Styled.CardWrapper>
    </Styled.Wrapper>
  );
}

export default AccountCard;
