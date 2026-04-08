'use client';

import Link from 'next/link';
import Button from '@/components/UI/Button/Button';
import css from './AuthNav.module.css';

export default function AuthNav() {
  return (
    <div className={css.nav}>
      <div className={css.buttons}>
        <Link href="/register" className={css.linkUp}>
          <Button variant="green" size="desktop" className={css.btn}>
            Sign Up
          </Button>
        </Link>
        <Link href="/login" className={css.linkIn}>
          <Button variant="outline" size="desktop" className={css.btn}>
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
}
