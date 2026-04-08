'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import css from './Logo.module.css';

const Logo = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const logoHref = isAuthenticated ? '/transactions/expenses' : '/';

  return (
    <Link href={logoHref} className={css.logo} aria-label="Home">
      <svg className={css.icon} width="27" height="16">
        <use href="/icons.svg#logo-icon" />
      </svg>
      <span className={css.text}>EXPENSETRACKER</span>
    </Link>
  );
};

export default Logo;
