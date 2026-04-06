'use client';

import { useCurrentUser } from '@/lib/hooks/useCurrentUser';
import styles from './TransactionsTotalAmount.module.css';
import { IncomeIndicatorIcon, ExpenseIndicatorIcon } from '@/components/UI/Icons/Icons';

export default function TransactionsTotalAmount() {
  const { data: user, isLoading } = useCurrentUser();

  const incomes = user?.transactionsTotal?.incomes ?? 0;
  const expenses = user?.transactionsTotal?.expenses ?? 0;

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
    }).format(amount);
  };

  if (isLoading) {
    return <div className={styles.loader}>Loading totals...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.block} ${styles.incomeBlock}`}>
        <div className={styles.iconWrapper}>
          <IncomeIndicatorIcon />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>Total Income</h3>
          <p className={styles.amount}>₴{formatAmount(incomes)}</p>
        </div>
      </div>

      <div className={`${styles.block} ${styles.expenseBlock}`}>
        <div className={styles.iconWrapper}>
          <ExpenseIndicatorIcon />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>Total Expense</h3>
          <p className={styles.amount}>₴{formatAmount(expenses)}</p>
        </div>
      </div>
    </div>
  );
}
