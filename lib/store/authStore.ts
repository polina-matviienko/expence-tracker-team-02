import { create } from 'zustand';
import { CurrentUserResponse } from '@/types/user';
import { getCurrentUser } from '@/lib/api/clientApi';

interface AuthState {
  user: CurrentUserResponse | null;
  isAuthenticated: boolean;
  isInitialized: boolean;

  setUser: (user: CurrentUserResponse) => void;
  logout: () => void;
  setInitialized: (value: boolean) => void;
  loadUser: () => Promise<void>;
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
      isInitialized: true,
    }),

  setInitialized: value =>
    set({
      isInitialized: value,
    }),

  loadUser: async () => {
    try {
      const user = await getCurrentUser();
      set({
        user,
        isAuthenticated: true,
        isInitialized: true,
      });
    } catch (error) {
      console.error('Failed to load user:', error);
      set({
        user: null,
        isAuthenticated: false,
        isInitialized: true,
      });
    }
  },
}));
