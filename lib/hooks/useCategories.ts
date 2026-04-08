// Получение списка категорий через React Query.
'use client';

import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/clientApi';
import { queryKeys } from '@/lib/constants/queryKeys';

export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: getCategories,
  });
};
