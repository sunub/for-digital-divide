"use client";

import { CircleUserIcon } from "lucide-react";
import { useHistory } from "@/shared/hooks/useHistory";
import { CardContent } from "./Card/CardContent";
import { CardLayout } from "./Card/CardLayout";
import { SmallCard } from "./Card/SmallCard";
import { HoveringTextField } from "./HoveringTextField";

export function EmailCard() {
  const { add } = useHistory();

  return (
    <CardLayout
      href={"/login?step=email-input"}
      onPress={() => add(new URL("/login", window.location.href).toString())}
    >
      <CardContent header={<CircleUserIcon />} footer="로그인" />
      <SmallCard />
      <HoveringTextField />
    </CardLayout>
  );
}
