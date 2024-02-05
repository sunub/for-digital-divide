import React from "react";
import InitFrame from "@compo/InitFrame";
import InitPage from "@compo/InitPage";
import { PreloadResources } from "./preload";

export default function Home() {
  return (
    <InitFrame>
      <PreloadResources />
      <InitPage />
    </InitFrame>
  );
}
