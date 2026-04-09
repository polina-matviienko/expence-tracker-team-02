import { create } from 'zustand';

type LoadingStore = {
  pendingCount: number;
  isLoading: boolean;
  start: () => void;
  finish: () => void;
  reset: () => void;
};

export const useLoadingStore = create<LoadingStore>((set) => ({
  pendingCount: 0,
  isLoading: false,
  start: () =>
    set((state) => {
      const nextCount = state.pendingCount + 1;
      return { pendingCount: nextCount, isLoading: true };
    }),
  finish: () =>
    set((state) => {
      const nextCount = Math.max(0, state.pendingCount - 1);
      return { pendingCount: nextCount, isLoading: nextCount > 0 };
    }),
  reset: () => set({ pendingCount: 0, isLoading: false }),
}));
