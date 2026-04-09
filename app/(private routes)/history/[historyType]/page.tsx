import { notFound } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import TransactionsHistoryPage from '@/components/History/TransactionsHistoryPage/TransactionsHistoryPage';
import { getTransactions } from '@/lib/api/serverApi';
import { queryKeys } from '@/lib/constants/queryKeys';
import type { TransactionType } from '@/types/sharedTypes';

export default async function HistoryTypePage({
  params,
}: {
  params: Promise<{ historyType: string }>;
}) {
  const { historyType } = await params;

  if (historyType !== 'incomes' && historyType !== 'expenses') {
    notFound();
  }

  const queryClient = new QueryClient();
  const type = historyType as TransactionType;

  await queryClient.prefetchQuery({
    queryKey: queryKeys.transactions(type, {}),
    queryFn: () => getTransactions(type),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TransactionsHistoryPage type={type} />
    </HydrationBoundary>
  );
}
