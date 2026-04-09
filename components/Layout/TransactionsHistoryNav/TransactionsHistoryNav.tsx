import Link from 'next/link';
import css from './TransactionsHistoryNav.module.css';

const TransactionsHistoryNav = () => {
  return (
    <ul className={css.list}>
      <li>
        <Link
          href="/history/expenses"
          className={`${css.link} ${css.expenseLink}`}
        >
          All Expense
        </Link>
      </li>
      <li>
        <Link
          href="/history/incomes"
          className={`${css.link} ${css.incomeLink}`}
        >
          All Income
        </Link>
      </li>
    </ul>
  );
};

export default TransactionsHistoryNav;
