'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@/lib/store/authStore';
import { getCurrentUser } from '@/lib/api/clientApi';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const setUser = useAuthStore(state => state.setUser);
  const setInitialized = useAuthStore(state => state.setInitialized);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setInitialized(true);
      }
    };

    loadUser();
  }, [setUser, setInitialized]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-right" reverseOrder={false} />
    </QueryClientProvider>
  );
}
