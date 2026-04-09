'use client';

import { useState } from 'react';
import css from './DecorationTab.module.css';
import { getRandomNumber } from '@/components/Auth/random';

interface BalanceData {
  dollars: string;
  cents: string;
  percent: string;
}

export default function DecorativeTab() {
  const [balance] = useState<BalanceData>(() => {
    const dollars = getRandomNumber(500, 999);
    const cents = getRandomNumber(0, 999).toString().padStart(3, '0');
    const percentInt = getRandomNumber(0, 3);
    const percentDec = getRandomNumber(0, 99).toString().padStart(2, '0');

    return {
      dollars: dollars.toString(),
      cents,
      percent: `+${percentInt}.${percentDec}%`,
    };
  });

  return (
    <div className={css.container}>
      <div className={css.icon}>
        <svg
          className={css.iconSvg}
          viewBox="0 0 26 32"
          width="18"
          height="18"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <use href="/icons.svg#icon-arrow-up" />
        </svg>
      </div>
      <div className={css.content}>
        <p className={css.title}>Your balance</p>
        <p className={css.balance}>
          ${balance.dollars}.{balance.cents}
        </p>
      </div>
      <div className={css.procentWrapper}>{balance.percent}</div>
    </div>
  );
}
