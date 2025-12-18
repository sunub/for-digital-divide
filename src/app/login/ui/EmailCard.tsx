"use client";

import { CircleUserIcon } from "lucide-react";
import { useState } from "react";
import { CardContent } from "./Card/CardContent";
import { CardLayout } from "./Card/CardLayout";
import { SmallCard } from "./Card/SmallCard";
import { HoveringTextField } from "./HoveringTextField";

export function EmailCard() {
  const [isHover, setIsHover] = useState(false);

  return (
    <CardLayout href={"/login?method=email"}>
      <CardContent
        setIsHovering={setIsHover}
        header={<CircleUserIcon />}
        footer="로그인"
      />
      <SmallCard />
      <HoveringTextField isHovering={isHover} />
    </CardLayout>
  );
}
