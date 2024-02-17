"use client";

import React from "react";
import InitFrame from "@compo/InitFrame";
import InitPage from "@compo/InitPage";
import { PreloadResources } from "./preload";
import SmallPhone from "@/components/SmallPhone";
import styled from "styled-components";
import Device from "@/components/Device";

export default function Home() {
  return (
    <React.Fragment>
      <div id="devsite-content__site-progression">
        <InitPage />
      </div>
      <div id="devsite-content__site-main">
        <SmallPhone />
      </div>
    </React.Fragment>
  );
}
