"use client";

import { Grid2X2PlusIcon, GridIcon } from "lucide-react";
import { useRef } from "react";
import { useToast } from "@/provider/toast/hooks/useToast";
import { useHistory } from "@/shared/hooks/useHistory";
import { useAnimationOnce } from "../hooks/useAnimationOnce";
import { useDeviceId } from "../hooks/useDeviceId";
import { CardContent } from "./Card/CardContent";
import { CardLayout } from "./Card/CardLayout";
import { CardSkeleton } from "./Card/CardSkeleton";
import { SmallCard } from "./Card/SmallCard";
import { HoveringTextField } from "./HoveringTextField";

export function PinNumberCard() {
  const skeletonRef = useRef<HTMLDivElement>(null);
  const { isLoading: isDataLoading, hasDeviceId } = useDeviceId();
  const isAnimationComplete = useAnimationOnce(skeletonRef);
  const { add } = useHistory();
  const showToast = useToast();

  if (isDataLoading || !isAnimationComplete) {
    return <CardSkeleton skeletonRef={skeletonRef} />;
  }

  return (
    <CardLayout
      disabled={!hasDeviceId}
      href={"/login?method=pin"}
      onPress={() => {
        if (!hasDeviceId) {
          showToast(
            "info",
            "적어도 한 번 로그인을 수행 후 핀번호를 등록 해야 핀번호를 사용할 수 있습니다.",
          );
          return;
        }

        add(new URL("/login", window.location.href).toString());
      }}
    >
      <CardContent
        hasDeviceId={hasDeviceId}
        header={hasDeviceId ? <GridIcon /> : <Grid2X2PlusIcon />}
        footer="핀번호"
      />
      <SmallCard hasDeviceId={hasDeviceId} />
      <HoveringTextField hasDeviceId={hasDeviceId} />
    </CardLayout>
  );
}
