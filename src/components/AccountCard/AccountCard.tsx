"use client";

import { Account } from "@/utils/account";
import * as Styled from "./AccountCard.style";
import Device from "../Device";

type AccountCardProps = {
  accounts: Account[];
};

function AccountCard() {
  return (
    <>
      <Styled.Wrapper>
        <Styled.CardWrapper>
          <header>
            <h1>bsc5672</h1>
          </header>
          <main>
            <span>{"426402-02-133421"}</span>
            <span>{"216,9180원"}</span>
          </main>
          <footer>
            <button>입금</button>
          </footer>
        </Styled.CardWrapper>
      </Styled.Wrapper>
    </>
  );
}

export default AccountCard;
