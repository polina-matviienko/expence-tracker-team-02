'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/constants/queryKeys';
import { getCategories } from '../api/clientApi';

export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
    select: data => {
      // The API returns { incomes: [], expenses: [] }
      return data;
    },
  });
};
