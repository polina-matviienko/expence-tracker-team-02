'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTransaction } from '@/lib/api/transactionsApi';
import { queryKeys } from '@/lib/constants/queryKeys';

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
      queryClient.invalidateQueries({ queryKey: queryKeys.stats });
    },
  });
};
