'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDeleteTransaction } from '@/lib/hooks/useDeleteTransaction';
import { useMedia } from '@/lib/hooks/useMedia';
import { useUserStore } from '@/lib/store/userStore';
import type { TransactionItem } from '@/types/transaction';
import type { TransactionType } from '@/types/sharedTypes';
import EditTransaction from '@/components/Modals/EditTransaction/EditTransaction';
import css from './TransactionsList.module.css';

interface TransactionsListProps {
  type: TransactionType;
  transactions: TransactionItem[];
  isLoading: boolean;
}

export default function TransactionsList({
  type,
  transactions,
  isLoading,
}: TransactionsListProps) {
  const deleteMutation = useDeleteTransaction();
  const user = useUserStore(state => state.user);
  const isPhoneLayout = useMedia('(min-width: 375px) and (max-width: 767px)');
  const [editedTransaction, setEditedTransaction] =
    useState<TransactionItem | null>(null);
  const currency = user?.currency ? user.currency.toUpperCase() : 'UAH';

  const truncateForPhone = (value: string, maxLength = 7) => {
    if (!isPhoneLayout || value.length <= maxLength) {
      return value;
    }

    return `${value.slice(0, maxLength)}...`;
  };

  const formatDateForViewport = (value: string) => {
    const parsedDate = new Date(`${value}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return value;
    }

    const weekDayShort = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][
      parsedDate.getDay()
    ];
    const day = parsedDate.getDate();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const year = parsedDate.getFullYear();

    return `${weekDayShort}, ${day}.${month}.${year}`;
  };

  const onDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync({ id, type });
      toast.success('Transaction deleted');
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as { response?: { data?: { message?: string } } })
          .response?.data?.message === 'string'
          ? ((error as { response?: { data?: { message?: string } } }).response
              ?.data?.message ?? 'Failed to fetch transactions')
          : 'Failed to delete transaction';
      toast.error(message);
    }
  };

  if (isLoading) {
    return <p className={css.state}>Loading transactions...</p>;
  }

  if (!transactions.length) {
    return <p className={css.state}>No transactions found.</p>;
  }
  return (
    <>
      <div className={css.tableWrap}>
        <div className={css.table}>
          <div className={css.headRow}>
            <span>Category</span>
            <span>Comment</span>
            <span>Date</span>
            <span>Time</span>
            <span>Sum</span>
            <span>Actions</span>
          </div>

          <ul className={css.list}>
            {transactions.map(transaction => (
              <li key={transaction._id} className={css.row}>
                <span>{transaction.category.categoryName}</span>
                <span>{truncateForPhone(transaction.comment || '—')}</span>
                <span>{formatDateForViewport(transaction.date)}</span>
                <span>{transaction.time}</span>
                <span className={css.sumValue}>
                  {transaction.sum} / {currency}
                </span>
                <div className={css.actions}>
                  <button
                    type="button"
                    className={`${css.iconButton} ${css.editButton}`}
                    onClick={() => setEditedTransaction(transaction)}
                    aria-label="Edit transaction"
                  >
                    <svg
                      aria-hidden
                      width={16}
                      height={16}
                      className={css.editIcon}
                    >
                      <use href="/icons.svg#icon-edit" />
                    </svg>
                    <span className={css.desktopButtonText}>Edit</span>
                  </button>
                  <button
                    type="button"
                    className={`${css.iconButton} ${css.deleteButton}`}
                    onClick={() => onDelete(transaction._id)}
                    aria-label="Delete transaction"
                    disabled={deleteMutation.isPending}
                  >
                    <svg
                      aria-hidden
                      width={16}
                      height={16}
                      className={css.deleteIcon}
                    >
                      <use href="/icons.svg#icon-trash" />
                    </svg>
                    <span className={css.desktopButtonText}>Delete</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {editedTransaction && (
        <EditTransaction
          key={editedTransaction._id}
          onClose={() => setEditedTransaction(null)}
          transaction={editedTransaction}
          type={type}
        />
      )}
    </>
  );
}
