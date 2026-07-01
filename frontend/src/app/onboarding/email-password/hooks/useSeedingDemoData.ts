import { seedDemoAccountAndTransactionInfo } from "@root/prisma/seed";
import { useEffect } from "react";

export function useSeedingDemoData(
  isSeedingProgress: boolean,
  onSeedingComplete: (completed: boolean) => void,
) {
  useEffect(() => {
    if (isSeedingProgress) {
      (async () => {
        try {
          console.log("데모 데이터 심고 있는 중~~~~~~~~");
          await seedDemoAccountAndTransactionInfo();
          onSeedingComplete(true);
        } catch (error) {
          console.error("Demo data seeding failed:", error);
          onSeedingComplete(false);
        }
      })();
    }
  }, [isSeedingProgress, onSeedingComplete]);
}
