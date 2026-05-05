'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  // Use useState to ensure QueryClient is only created once on the client side
  // This prevents re-renders from creating a new queryClient and losing cache
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // Keep cache for 1 minute to avoid unnecessary API calls
            refetchOnWindowFocus: false, // Disable auto-refetch when user switches browser tabs
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
