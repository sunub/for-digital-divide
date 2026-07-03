"use client";

import { GridIcon } from "lucide-react";
import { useRef } from "react";
import { useAnimationOnce } from "../hooks/useAnimationOnce";
import { CardContent } from "./Card/CardContent";
import { CardLayout } from "./Card/CardLayout";
import { CardSkeleton } from "./Card/CardSkeleton";
import { SmallCard } from "./Card/SmallCard";
import { HoveringTextField } from "./HoveringTextField";

export function PinNumberCard({
  href = "/onboarding?step=pin-input",
}: {
  href?: string;
}) {
  const skeletonRef = useRef<HTMLDivElement>(null);
  const isAnimationComplete = useAnimationOnce(skeletonRef);

  if (!isAnimationComplete) {
    return <CardSkeleton skeletonRef={skeletonRef} />;
  }

  return (
    <CardLayout href={href}>
      <CardContent header={<GridIcon />} footer="핀번호" />
      <SmallCard hasDeviceId={true} />
      <HoveringTextField hasDeviceId={true} />
    </CardLayout>
  );
}
