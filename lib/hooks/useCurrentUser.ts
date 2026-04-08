// Отримання поточного користувача та синхронізація auth стору.
'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/constants/queryKeys';
import { useAuthStore } from '@/lib/store/authStore';
import { getCurrentUser } from '@/lib/api/clientApi';

export const useCurrentUser = () => {
  const setUser = useAuthStore(state => state.setUser);
  const logout = useAuthStore(state => state.logout);

  const query = useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: () => getCurrentUser(),
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
