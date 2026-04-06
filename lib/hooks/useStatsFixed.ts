'use client';

import { useQuery } from '@tanstack/react-query';
import { getCurrentMonthStats } from '@/lib/api/statsApi';
import { queryKeys } from '@/lib/constants/queryKeys';

export const useStats = () => {
  return useQuery({
    queryKey: queryKeys.statsCurrentMonth,
    queryFn: () => Promise.resolve([
      { _id: 'mock-1', category: 'Food', totalAmount: 500, percentage: 50 },
      { _id: 'mock-2', category: 'Transport', totalAmount: 200, percentage: 20 },
      { _id: 'mock-3', category: 'Rent', totalAmount: 300, percentage: 30 },
    ]),
  });
};



