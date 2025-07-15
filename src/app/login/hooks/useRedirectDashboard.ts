import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useRedirectDashboard(isSeedingProgress: boolean) {
  const router = useRouter();
  useEffect(() => {
    router.prefetch('/dashboard');
    if (isSeedingProgress) {
      router.push('/dashboard');
    }
  }, [isSeedingProgress, router]);
}
