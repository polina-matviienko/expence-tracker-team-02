import { useLoadingStore } from '../hooks/use-loading-store';

export const loadingFetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
) => {
  const { start, finish } = useLoadingStore.getState();

  start();
  try {
    return await fetch(input, init);
  } finally {
    finish();
  }
};
