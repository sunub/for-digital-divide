import Device from "@/components/Device";
import { Page } from "./page.style";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Page>
      <Device>{children}</Device>
    </Page>
  );
}

export default Layout;
