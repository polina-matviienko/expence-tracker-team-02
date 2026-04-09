'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/UI/Button/Button';
import css from './AuthNav.module.css';

export default function AuthNav() {
  const router = useRouter();

  return (
    <div className={css.nav}>
      <div className={css.buttons}>
        <Button
          type="button"
          variant="green"
          size="desktop"
          className={`${css.btn} ${css.signUpBtn}`}
          onClick={() => router.push('/register')}
        >
          Sign Up
        </Button>
        <Button
          type="button"
          variant="outline"
          size="desktop"
          className={`${css.btn} ${css.signInBtn}`}
          onClick={() => router.push('/login')}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
