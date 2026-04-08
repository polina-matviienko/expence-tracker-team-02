'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import Logo from '../Logo/Logo';
import TransactionsHistoryNav from '../TransactionsHistoryNav/TransactionsHistoryNav';
import UserBarBtn from '../UserBarBtn/UserBarBtn';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import css from './Header.module.css';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, isInitialized } = useAuthStore();

  const headerClasses = `${css.header} ${!isAuthenticated ? css.isPublic : ''}`;

  if (!isInitialized) {
    return (
      <header className={headerClasses}>
        <div className="container">
          <div className={css.headerContent}>
            <Logo />
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className={headerClasses}>
        <div className="container">
          <div className={css.headerContent}>
            <Logo />

            {/*ТИМЧАСОВА НАВІГАЦІЯ ДЛЯ ЗРУЧНОСТІ */}

            <Link href="/login">Log In</Link>
            <Link href="/register">Register</Link>

            {isAuthenticated && (
              <>
                <nav
                  className={css.navigation}
                  aria-label="Main transaction navigation"
                >
                  <TransactionsHistoryNav />
                </nav>

                <div className={css.userBarBtn}>
                  <UserBarBtn />
                </div>

                <button
                  className={css.burgerBtn}
                  type="button"
                  aria-label="Open menu"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <svg className={css.burgerIcon}>
                    <use href="/icons.svg#icon-burger-menu" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {isAuthenticated && (
        <BurgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      )}
    </>
  );
}
