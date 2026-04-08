// Отримання поточного користувача та синхронізація auth стору.
'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/constants/queryKeys';
import { useAuthStore } from '@/lib/store/authStore';
import type { CurrentUserResponse } from '@/types/user';

export const useCurrentUser = () => {
  const setUser = useAuthStore(state => state.setUser);
  const logout = useAuthStore(state => state.logout);

  const query = useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: () =>
      Promise.resolve<CurrentUserResponse>({
        _id: '123',
        name: 'Test User',
        email: 'test@example.com',
        avatarUrl: '',
        currency: 'usd',
        categories: {
          incomes: [],
          expenses: [],
        },
        transactionsTotal: {
          incomes: 5000.0,
          expenses: 1250.0,
        },
      }),
    retry: false,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setUser(query.data);
    }

    if (query.isError) {
      logout();
    }
  }, [query.isSuccess, query.isError, query.data, setUser, logout]);

  return query;
};
