'use client';

import { useState } from 'react';
import css from './DecorationTab.module.css';

export default function DecorativeTab() {
  const [balance] = useState({
    dollars: '632',
    cents: '000',
    percent: '+1.29%',
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
