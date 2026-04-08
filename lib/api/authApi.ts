import { api } from './api';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/types/authentication';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

export async function registerUser(
  data: RegisterRequest
): Promise<RegisterResponse> {
  try {
    const response = await api.post<RegisterResponse>('/auth/register', data);
    toast.success('Регистрация прошла успешно!');
    return response.data;
  } catch (error: AxiosError) {
    const message =
      error.response?.status === 409
        ? 'Пользователь с таким email уже существует'
        : (error.response?.data as any)?.message || 'Ошибка регистрации';

    toast.error(message);
    throw error;
  }
}

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>('/auth/login', data);
    toast.success('Вход выполнен успешно!');
    return response.data;
  } catch (error: AxiosError) {
    const message =
      error.response?.status === 403
        ? 'Неверный email или пароль'
        : (error.response?.data as any)?.message || 'Ошибка входа';

    toast.error(message);
    throw error;
  }
}

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const refreshSession = async (): Promise<void> => {
  await api.get('/auth/session');
};
