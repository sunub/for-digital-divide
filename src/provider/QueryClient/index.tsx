'use client';

import { defaultShouldDehydrateQuery, QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 7000,
        refetchOnWindowFocus: false,
        ...(typeof window === 'undefined' && { cacheTime: 0 }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        retry: (failureCount: number, error: any) => {
          if (process.env.NODE_ENV !== 'production') return false;
          if (error.message === 'Network request failed' && failureCount <= 3) return true;
          return false;
        },
      },
      dehydrate: {
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
