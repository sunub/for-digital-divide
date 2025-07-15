import { useEffect } from 'react';
import { seedDemoAccountInfo } from '@root/prisma/seed';

export function useSeedingDemoData(isSeedingProgress: boolean, setIsSeedingProgress: (value: boolean) => void) {
  useEffect(() => {
    (async () => {
      if (isSeedingProgress) {
        await seedDemoAccountInfo();
        setIsSeedingProgress(false);
      }
    })();
  }, [isSeedingProgress]);
}
