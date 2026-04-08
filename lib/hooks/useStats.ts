// Получение агрегированной статистики через React Query.
'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/constants/queryKeys';
import { getCurrentMonthStats } from '../api/clientApi';

export const useStats = () => {
  return useQuery({
    queryKey: queryKeys.stats,
    queryFn: getCurrentMonthStats,
  });
};
