'use client';

import { useEffect, useState } from 'react';
import { useLoadingStore } from '@/lib/hooks/use-loading-store';
import Loader from './Loader';

const SHOW_DELAY_MS = 120;

export default function GlobalLoader() {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isLoading) {
      timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    } else {
      setVisible(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading]);

  if (!visible) return null;

  return <Loader overlay label="Loading..." />;
}
