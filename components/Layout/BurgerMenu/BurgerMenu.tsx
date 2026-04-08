'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import TransactionsHistoryNav from '@/components/Layout/TransactionsHistoryNav/TransactionsHistoryNav';
import UserBarBtn from '@/components/Layout/UserBarBtn/UserBarBtn';
import css from './BurgerMenu.module.css';

type BurgerMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function BurgerMenu({
  isOpen,
  onClose,
}: BurgerMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navStateClass = pathname.includes('/transactions/incomes')
    ? css.incomesActive
    : css.expensesActive;

  return (
    <div className={css.overlay} onClick={onClose}>
      <aside
        className={css.panel}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Burger menu"
      >
        <div className={css.topRow}>
          <div className={css.userBarBtn}>
                <UserBarBtn onBurgerClose={onClose}/>
              </div>

          <button
            type="button"
            className={css.closeBtn}
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 4L23 23M23 4L4 23"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div
          className={`${css.navWrap} ${navStateClass}`}
          onClick={onClose}
        >
          <TransactionsHistoryNav />
        </div>
      </aside>
    </div>
  );
}