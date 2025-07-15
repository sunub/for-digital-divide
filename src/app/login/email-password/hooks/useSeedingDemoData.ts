import { useEffect } from 'react';
import { seedDemoAccountInfo } from '@root/prisma/seed';

export function useSeedingDemoData(isSeedingProgress: boolean, onSeedingComplete: (completed: boolean) => void) {
  useEffect(() => {
    if (isSeedingProgress) {
      (async () => {
        console.log('데모 데이터 심고 있는 중~~~~~~~~');
        await seedDemoAccountInfo();
        onSeedingComplete(true);
      })();
    }
  }, [isSeedingProgress, onSeedingComplete]);
}
