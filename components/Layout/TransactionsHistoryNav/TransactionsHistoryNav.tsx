'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './TransactionsHistoryNav.module.css';

const TransactionsHistoryNav = () => {
  const pathname = usePathname();

  return (
    <ul className={css.list}>
      <li>
        <Link
          href="/history/expenses"
          className={`
            ${css.link} 
            ${css.expenseLink} 
            ${pathname === '/history/expenses' ? css.active : ''}
          `}
        >
          All Expense
        </Link>
      </li>
      <li>
        <Link
          href="/history/incomes"
          className={`
            ${css.link} 
            ${css.incomeLink} 
            ${pathname === '/history/incomes' ? css.active : ''}
          `}
        >
          All Income
        </Link>
      </li>
    </ul>
  );
};

export default TransactionsHistoryNav;
