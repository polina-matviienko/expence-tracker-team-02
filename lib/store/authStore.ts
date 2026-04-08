import { create } from 'zustand';
import { CurrentUserResponse } from '@/types/user';

interface AuthState {
  user: CurrentUserResponse | null;
  isAuthenticated: boolean;
  isInitialized: boolean;

  setUser: (user: CurrentUserResponse) => void;
  logout: () => void;
  setInitialized: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,

  setUser: user =>
    set({
      user,
      isAuthenticated: true,
      isInitialized: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  setInitialized: value =>
    set({
      isInitialized: value,
    }),
}));
