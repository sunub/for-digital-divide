import Device from "@/components/Device";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="devsite-content__site-main">
      <Device>{children}</Device>
    </div>
  );
}
