'use client';

import { useCurrentUser } from '@/lib/hooks/useCurrentUser';
import styles from './TransactionsTotalAmount.module.css';
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

  const currency = user?.currency ? user.currency.toUpperCase() : 'UAH';

  const renderAmount = (amount: number) => {
    if (!amount || amount === 0) {
      return (
        <p
          className={styles.amount}
          style={{ color: 'rgba(250, 250, 250, 0.5)' }}
        >
          0 {currency}
        </p>
      );
    }
    return <p className={styles.amount}>{formatAmount(amount)} {currency}</p>;
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
          <svg width="43" height="43" viewBox="0 0 43 43" fill="none">
            <rect width="43" height="43" rx="16" fill="rgba(14, 243, 135, 1)" />
            <use
              href="/icons.svg#icon-arrow-up"
              x="13.5"
              y="13.5"
              width="16"
              height="16"
              fill="rgba(12, 13, 13, 1)"
            />
          </svg>
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>Total Income</h3>
          {renderAmount(incomes)}
        </div>
      </div>

      <div className={`${styles.block} ${styles.expenseBlock}`}>
        <div className={styles.iconWrapper}>
          <svg width="43" height="43" viewBox="0 0 43 43" fill="none">
            <rect width="43" height="43" rx="16" fill="rgba(14, 243, 135, 1)" />
            <use
              href="/icons.svg#icon-arrow-down"
              x="13.5"
              y="13.5"
              width="16"
              height="16"
              fill="rgba(12, 13, 13, 1)"
            />
          </svg>
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>Total Expense</h3>
          {renderAmount(expenses)}
        </div>
      </div>
    </div>
  );
}
