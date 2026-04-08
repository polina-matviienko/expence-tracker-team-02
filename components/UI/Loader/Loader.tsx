'use client';

import { TailSpin } from 'react-loading-icons';
import css from './Loader.module.css';

type LoaderProps = {
  label?: string;
  size?: number;
  color?: string;
  overlay?: boolean;
};

export default function Loader({
  label = 'Loading...',
  size = 64,
  color = 'var(--green-neon)',
  overlay = true,
}: LoaderProps) {
  const Wrapper = overlay ? 'div' : 'span';

  return (
    <Wrapper className={overlay ? css.overlay : undefined}>
      <div className={css.card}>
        <TailSpin
          stroke={color}
          strokeWidth={3}
          speed={1}
          width={size}
          height={size}
          aria-label={label}
          className={css.spinner}
        />
        <p className={css.label}>{label}</p>
      </div>
    </Wrapper>
  );
}
