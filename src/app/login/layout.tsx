import Device from "@/components/Device";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="devsite-content__site-main">
      <Device>{children}</Device>
    </div>
  );
}

export default Layout;
