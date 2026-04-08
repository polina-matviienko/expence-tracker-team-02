'use client';

import { useEffect, useState } from 'react';
import css from './DecorationTab.module.css';
import { getRandomNumber } from '@/components/Auth/random';

export default function DecorativeTab() {
  const [balance, setBalance] = useState({
    dollars: '000',
    cents: '000',
    percent: '+0.00%',
  });

  useEffect(() => {
    const dollars = getRandomNumber(500, 999);
    const cents = getRandomNumber(0, 999).toString().padStart(3, '0');
    const percentInt = getRandomNumber(0, 3);
    const percentDec = getRandomNumber(0, 99).toString().padStart(2, '0');

    setBalance({
      dollars: dollars.toString(),
      cents,
      percent: `+${percentInt}.${percentDec}%`,
    });
  }, []);

  return (
    <div className={css.container}>
      <svg width="24" height="24">
        <use href="/icons.svg#icon-chevron-down" />
      </svg>
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
