// Создание транзакции с инвалидацией кешей транзакций, пользователя и статистики.
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTransaction } from '@/lib/api/transactionsApi';
import { queryKeys } from '@/lib/constants/queryKeys';
import type { CreateTransactionRequest } from '@/types/transaction';

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTransactionRequest) => createTransaction(payload),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.transactions(variables.type),
      });
      await queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
      
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const txDate = new Date(variables.date);
      
      if (txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear) {
        await queryClient.invalidateQueries({ queryKey: queryKeys.stats });
      }
    },
  });
};
