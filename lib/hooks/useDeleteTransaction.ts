// Удаление транзакции с инвалидацией связанных кешей.
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/constants/queryKeys';
import type { TransactionType } from '@/types/sharedTypes';
import { deleteTransaction } from '../api/clientApi';

interface DeleteTransactionPayload {
  id: string;
  type: TransactionType;
}

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, type }: DeleteTransactionPayload) =>
      deleteTransaction(type, id),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.transactionsByType(variables.type),
      });
      await queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
      await queryClient.invalidateQueries({ queryKey: queryKeys.stats });
    },
  });
};
