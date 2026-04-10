'use client';

import Link from 'next/link';
import css from './AuthNav.module.css';

export default function AuthNav() {
  return (
    <div className={css.nav}>
      <div className={css.links}>
        <Link href="/register" className={`${css.linkUp} ${css.link}`}>
          Sign Up
        </Link>
        <Link href="/login" className={`${css.linkIn} ${css.link}`}>
          Sign In
        </Link>
      </div>
    </div>
  );
}
