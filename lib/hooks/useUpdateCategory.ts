// Обновление категории с инвалидацией кеша.
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/constants/queryKeys';
import type { UpdateCategoryRequest } from '@/types/category';
import { updateCategory } from '../api/clientApi';

interface UpdateCategoryPayload {
  id: string;
  data: UpdateCategoryRequest;
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCategoryPayload) =>
      updateCategory(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      await queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
    },
  });
};
