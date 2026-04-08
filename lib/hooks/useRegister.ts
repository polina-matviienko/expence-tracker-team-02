// Регистрация: мутация, установка auth и пользователя.
'use client';

import { useMutation } from '@tanstack/react-query';
import type { RegisterRequest } from '@/types/authentication';
import { register } from '../api/clientApi';

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterRequest) => register(payload),
  });
};
