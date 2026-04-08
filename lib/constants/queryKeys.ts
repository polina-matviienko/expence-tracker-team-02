// Общие константы для проекта.
// Здесь ключи для React Query: кеширование и инвалидация запросов.
import type { TransactionType } from '@/types/sharedTypes';

export const queryKeys = {
  currentUser: ['current-user'] as const,
  categories: ['categories'] as const,
  stats: ['stats', 'current-month'] as const,
  statsCurrentMonth: ['stats', 'current-month'] as const,

  transactions: (
    type: TransactionType,
    params?: { date?: string; search?: string }
  ) =>
    ['transactions', type, params?.date ?? '', params?.search ?? ''] as const,

  transactionsByType: (type: TransactionType) =>
    ['transactions', type] as const,
};
