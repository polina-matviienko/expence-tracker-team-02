import { notFound } from 'next/navigation';
import TransactionsHistoryPage from '@/components/History/TransactionsHistoryPage//TransactionsHistoryPage';

export default async function HistoryTypePage({
  params,
}: {
  params: Promise<{ historyType: string }>;
}) {
  const { historyType } = await params;

  if (historyType !== 'incomes' && historyType !== 'expenses') {
    notFound();
  }

  return <TransactionsHistoryPage type={historyType} />;
}
