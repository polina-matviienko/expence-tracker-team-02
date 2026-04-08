import Link from 'next/link';
import css from './TransactionsHistoryNav.module.css';

const TransactionsHistoryNav = () => {
  return (
    <ul className={css.list}>
      <li>
        <Link href="/transactions/expenses" className={`${css.link} ${css.expenseLink}`}>
          All Expense
        </Link>
      </li>
      <li>
        <Link href="/transactions/incomes" className={`${css.link} ${css.incomeLink}`}>
          All Income
        </Link>
      </li>
    </ul>
  );
};

export default TransactionsHistoryNav;
