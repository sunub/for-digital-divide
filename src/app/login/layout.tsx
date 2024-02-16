import Device from "@/components/Device";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", placeContent: "center" }}>
      <Device>{children}</Device>
    </div>
  );
}

export default Layout;
