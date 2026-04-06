// Получение текущего юзера и синхронизация auth/user стора.
'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/lib/api/usersApi';
import { queryKeys } from '@/lib/constants/queryKeys';
import { useAuthStore } from '@/lib/store/authStore';
import { useUserStore } from '@/lib/store/userStore';


export const useCurrentUser = () => {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  const query = useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: () => Promise.resolve({
      name: 'Test User',
      email: 'test@example.com',
      avatarUrl: '',
      transactionsTotal: {
        incomes: 5000.00,
        expenses: 1250.00
      }
    }),
    retry: false,
  });


  useEffect(() => {
    if (query.isSuccess && query.data) {
      setUser(query.data);
      setIsAuthenticated(true);
    }

    if (query.isError) {
      clearUser();
      setIsAuthenticated(false);
    }
  }, [query.isSuccess, query.isError, query.data, setUser, clearUser, setIsAuthenticated]);

  return query;
};
