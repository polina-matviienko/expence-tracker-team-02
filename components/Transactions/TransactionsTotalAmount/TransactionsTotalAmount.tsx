'use client';

import { useCurrentUser } from '@/lib/hooks/useCurrentUser';
import styles from './TransactionsTotalAmount.module.css';
import { IncomeIndicatorIcon, ExpenseIndicatorIcon } from '@/components/UI/Icons/Icons';
import Loader from '@/components/UI/Loader/Loader';
import Skeleton from '@/components/UI/Skeleton/Skeleton';

export default function TransactionsTotalAmount() {
  const { data: user, isLoading } = useCurrentUser();

  const incomes = user?.transactionsTotal?.incomes ?? 0;
  const expenses = user?.transactionsTotal?.expenses ?? 0;

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const renderAmount = (amount: number) => {
    if (!amount || amount === 0) {
      return (
        <p className={styles.amount} style={{ color: 'rgba(250, 250, 250, 0.5)' }}>
          0
        </p>
      );
    }
    return <p className={styles.amount}>₴{formatAmount(amount)}</p>;
  };

  if (isLoading) {
    return (
      <div className={styles.skeletonWrap}>
        <div className={styles.block}>
          <div className={styles.iconWrapper}>
            <Skeleton width={32} height={32} radius="50%" />
          </div>
          <div className={styles.info}>
            <Skeleton width={120} height={14} />
            <Skeleton width={90} height={18} />
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.iconWrapper}>
            <Skeleton width={32} height={32} radius="50%" />
          </div>
          <div className={styles.info}>
            <Skeleton width={120} height={14} />
            <Skeleton width={90} height={18} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.block} ${styles.incomeBlock}`}>
        <div className={styles.iconWrapper}>
          <IncomeIndicatorIcon />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>Total Income</h3>
          {renderAmount(incomes)}
        </div>
      </div>

      <div className={`${styles.block} ${styles.expenseBlock}`}>
        <div className={styles.iconWrapper}>
          <ExpenseIndicatorIcon />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>Total Expense</h3>
          {renderAmount(expenses)}
        </div>
      </div>
    </div>
  );
}
