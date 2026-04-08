// Обновление транзакции с инвалидацией кешей.
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/constants/queryKeys';
import type { TransactionType } from '@/types/sharedTypes';
import type { UpdateTransactionRequest } from '@/types/transaction';
import { updateTransaction } from '../api/clientApi';

interface UpdateTransactionPayload {
  type: TransactionType;
  id: string;
  data: UpdateTransactionRequest;
}

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ type, id, data }: UpdateTransactionPayload) =>
      updateTransaction(type, id, data),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.transactionsByType(variables.type),
      });
      await queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
      await queryClient.invalidateQueries({ queryKey: queryKeys.stats });
    },
  });
};
