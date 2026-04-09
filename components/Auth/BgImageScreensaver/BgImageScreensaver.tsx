'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import heroPhone from '@/public/img/Rectangle1xphone.png';
import heroPhone2x from '@/public/img/Rectangle2xphone.png';
import heroTab from '@/public/img/Rectangle1xtab.png';
import heroTab2x from '@/public/img/Rectangle2xtab.png';
import heroDesk from '@/public/img/Rectangle1xdesk.png';
import heroDesk2x from '@/public/img/Rectangle2xdesk.png';
import css from './BgImageScreensaver.module.css';

const DvdMover = dynamic(() => import('./DvdMover'), { ssr: false });

export default function BgImageScreensaver() {
  return (
    <div className={css.bgImage}>
      <picture>
        <source
          srcSet={`${heroDesk.src} 1x, ${heroDesk2x.src} 2x`}
          media="(min-width: 1440px)"
        />
        <source
          srcSet={`${heroTab.src} 1x, ${heroTab2x.src} 2x`}
          media="(min-width: 768px)"
        />
        <source srcSet={`${heroPhone.src} 1x, ${heroPhone2x.src} 2x`} />
        <Image
          src={heroPhone}
          alt="Hero Image"
          style={{ width: '100%', height: 'auto' }}
        />
      </picture>
      <DvdMover />
    </div>
  );
}
