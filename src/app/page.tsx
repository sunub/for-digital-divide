import React from "react";
import InitFrame from "@compo/InitFrame";
import InitPage from "@compo/InitPage";
import { PreloadResources } from "./preload";
import SmallPhone from "@/components/SmallPhone";

export default function Home() {
  return (
    <InitFrame>
      <InitPage />
      <SmallPhone />
    </InitFrame>
  );
}
