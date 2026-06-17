import { requireAuthSession } from "@/entities/auth/session.server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuthSession();
  return <>{children}</>;
}
