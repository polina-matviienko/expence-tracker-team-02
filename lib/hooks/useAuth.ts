// Хелпер для читання/запису auth та user стану з zustand.

import type { CurrentUserResponse } from '@/types/user';
import { useAuthStore } from '../store/authStore';

interface UseAuthReturn {
  user: CurrentUserResponse | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setUser: (user: CurrentUserResponse) => void;
  logout: () => void;
  setInitialized: (value: boolean) => void;
}

export const useAuth = (): UseAuthReturn => {
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isInitialized = useAuthStore(state => state.isInitialized);
  const setUser = useAuthStore(state => state.setUser);
  const logout = useAuthStore(state => state.logout);
  const setInitialized = useAuthStore(state => state.setInitialized);

  return {
    user,
    isAuthenticated,
    isInitialized,
    setUser,
    logout,
    setInitialized,
  };
};
