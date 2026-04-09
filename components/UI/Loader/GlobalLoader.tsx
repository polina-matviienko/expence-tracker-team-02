'use client';

import { useEffect, useRef, useState } from 'react';
import { useLoadingStore } from '@/lib/hooks/use-loading-store';
import Loader from './Loader';

const SHOW_DELAY_MS = 120;

export default function GlobalLoader() {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    timerRef.current = isLoading
      ? setTimeout(() => setVisible(true), SHOW_DELAY_MS)
      : setTimeout(() => setVisible(false), 0);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isLoading]);

  if (!visible) return null;

  return <Loader overlay label="Loading..." />;
}
