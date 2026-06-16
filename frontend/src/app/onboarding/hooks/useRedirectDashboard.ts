import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRedirectDashboard(isSeedingCompleted: boolean) {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/dashboard");
    if (isSeedingCompleted) {
      router.push("/dashboard");
    }
  }, [isSeedingCompleted, router]);
}
