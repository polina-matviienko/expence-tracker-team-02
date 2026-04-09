'use client';

import css from './DecorationTab.module.css';

export default function DecorativeTab() {
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
        <p className={css.balance}>$632.000</p>
      </div>
      <div className={css.procentWrapper}>+1.29%</div>
    </div>
  );
}
