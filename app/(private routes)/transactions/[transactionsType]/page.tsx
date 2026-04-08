import { notFound } from 'next/navigation';
import TransactionsTotalAmount from '@/components/Transactions/TransactionsTotalAmount/TransactionsTotalAmount';
import TransactionsChart from '@/components/Transactions/TransactionsChart/TransactionsChart';
import TransactionForm from '@/components/Transactions/TransactionForm/TransactionForm';
import styles from './MainTransactionsPage.module.css';

export default async function TransactionsPage({
  params,
}: {
  params: Promise<{ transactionsType: string }>;
}) {
  const { transactionsType } = await params;

  if (transactionsType !== 'incomes' && transactionsType !== 'expenses') {
    notFound();
  }

  const title = transactionsType === 'incomes' ? 'Incomes' : 'Expenses';
  const description =
    transactionsType === 'incomes'
      ? 'Browse and manage your income transactions to keep track of your earnings and financial growth.'
      : 'Capture and organize every penny spent with ease! A clear view of your expenses is the first step toward smart financial habits.';

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <section className={styles.headerSection}>
          <h1 className={styles.title}>{title} Log</h1>
          <p className={styles.description}>{description}</p>
        </section>

        <section className={styles.statsSection}>
          <TransactionsTotalAmount />
        </section>

        <section className={styles.formSection}>
          <TransactionForm
            transactionType={transactionsType as 'incomes' | 'expenses'}
          />
        </section>

        <section className={styles.chartSection}>
          <TransactionsChart />
        </section>
      </div>
    </div>
  );
}
