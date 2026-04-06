'use client';

import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/lib/api/categoriesApi';
import { queryKeys } from '@/lib/constants/queryKeys';

export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
    select: (data) => {
      // The API returns { incomes: [], expenses: [] }
      return data;
    },
  });
};


