// Обновление серверной сессии (mutation placeholder).
'use client';

import { useMutation } from '@tanstack/react-query';
import { checkSessionServer } from '../api/serverApi';

export const useSession = () => {
  return useMutation({
    mutationFn: checkSessionServer,
  });
};
