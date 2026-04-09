'use client';

import { useDvdScreensaver } from 'react-dvd-screensaver';
import DecorativeTab from '@/components/Auth/DecorationTab/DecorationTab';
import css from './BgImageScreensaver.module.css';

export default function DvdMover() {
  const { elementRef } = useDvdScreensaver({ speed: 0.5, freezeOnHover: true });

  return (
    <div ref={elementRef} className={css.dvdElement}>
      <DecorativeTab />
    </div>
  );
}
