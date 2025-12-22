"use client";

import { Grid2X2PlusIcon, GridIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useAnimationOnce } from "../hooks/useAnimationOnce";
import { useDeviceId } from "../hooks/useDeviceId";
import { CardContent } from "./Card/CardContent";
import { CardLayout } from "./Card/CardLayout";
import { CardSkeleton } from "./Card/CardSkeleton";
import { SmallCard } from "./Card/SmallCard";
import { HoveringTextField } from "./HoveringTextField";

export function PinNumberCard() {
  const [isHover, setIsHover] = useState(false);
  const skeletonRef = useRef<HTMLDivElement>(null);
  const { isLoading: isDataLoading, hasDeviceId } = useDeviceId();
  const isAnimationComplete = useAnimationOnce(skeletonRef);
  console.log(hasDeviceId);

  if (isDataLoading || !isAnimationComplete) {
    return <CardSkeleton skeletonRef={skeletonRef} />;
  }

  return (
    <CardLayout hasDeviceId={hasDeviceId} href={"/login?method=pin"}>
      <CardContent
        hasDeviceId={hasDeviceId}
        setIsHovering={setIsHover}
        header={hasDeviceId ? <GridIcon /> : <Grid2X2PlusIcon />}
        footer="핀번호"
      />
      <SmallCard hasDeviceId={hasDeviceId} />
      <HoveringTextField hasDeviceId={hasDeviceId} isHovering={isHover} />
    </CardLayout>
  );
}
