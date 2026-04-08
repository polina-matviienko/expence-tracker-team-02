// Получение списка транзакций по типу с фильтрами.
'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/constants/queryKeys';
import type { TransactionType } from '@/types/sharedTypes';
import { getTransactions } from '../api/serverApi';

interface UseTransactionsParams {
  type: TransactionType;
  date?: string;
  search?: string;
}

export const useTransactions = ({
  type,
  date,
  search,
}: UseTransactionsParams) => {
  return useQuery({
    queryKey: queryKeys.transactions(type, { date, search }),
    queryFn: () => getTransactions(type, { date, search }),
    enabled: Boolean(type),
  });
};
