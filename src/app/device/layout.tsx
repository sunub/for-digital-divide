import Device from "@/components/Device";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="device-page__root-wrapper">
      <Device>{children}</Device>
    </div>
  );
}

export default Layout;
