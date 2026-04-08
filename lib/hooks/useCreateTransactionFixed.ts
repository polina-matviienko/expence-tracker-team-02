'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTransaction } from '@/lib/api/transactionsApi';
import { queryKeys } from '@/lib/constants/queryKeys';

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
      
      // Only invalidate current month's stats if the transaction is truly for the current month
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const txDate = new Date(variables.date);
      
      if (txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear) {
        queryClient.invalidateQueries({ queryKey: queryKeys.stats });
      }
    },
  });
};
