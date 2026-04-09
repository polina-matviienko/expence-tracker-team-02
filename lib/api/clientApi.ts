import { CurrentUserResponse } from '@/types/user';
import { nextServer } from './api';
import type {
  UpdateAvatarResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '@/types/user';

import type {
  CategoriesResponse,
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
} from '@/types/category';

import type {
  CreateTransactionRequest,
  CreateTransactionResponse,
  DeleteTransactionResponse,
  TransactionItem,
  TransactionType,
  UpdateTransactionRequest,
  UpdateTransactionResponse,
} from '@/types/transaction';

import type { CategoryStatItem } from '@/types/stats';

//! AUTH
export type RegisterDataRequest = {
  name: string;
  email: string;
  password: string;
};
export type LoginDataRequest = {
  email: string;
  password: string;
};
export type UpdateUserData = {
  username?: string;
};

export const login = async (
  userData: LoginDataRequest
): Promise<CurrentUserResponse> => {
  const { data } = await nextServer.post<CurrentUserResponse>(
    '/auth/login',
    userData
  );
  return data;
};

export const register = async (
  userData: RegisterDataRequest
): Promise<CurrentUserResponse> => {
  const { data } = await nextServer.post<CurrentUserResponse>(
    '/auth/register',
    userData
  );
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const refreshSession = async (): Promise<void> => {
  await nextServer.get('/auth/session');
};

//! USER

export const getCurrentUser = async (): Promise<CurrentUserResponse> => {
  const response = await nextServer.get<CurrentUserResponse>('/users/current');

  return response.data;
};

export const updateUserInfo = async (
  payload: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  const response = await nextServer.patch<UpdateUserResponse>(
    '/users/info',
    payload
  );

  return response.data;
};

export const uploadAvatar = async (
  formData: FormData
): Promise<UpdateAvatarResponse> => {
  const response = await nextServer.patch<UpdateAvatarResponse>(
    '/users/avatar',
    formData
  );

  return response.data;
};

export const removeAvatar = async (): Promise<void> => {
  await nextServer.delete('/users/avatar');
};

//! CATEGORY
export const getCategories = async (): Promise<CategoriesResponse> => {
  const response = await nextServer.get<CategoriesResponse>('/categories');

  return response.data;
};

export const createCategory = async (
  payload: CreateCategoryRequest
): Promise<Category> => {
  const response = await nextServer.post<Category>('/categories', payload);

  return response.data;
};

export const updateCategory = async (
  id: string,
  payload: UpdateCategoryRequest
): Promise<UpdateCategoryResponse> => {
  const response = await nextServer.patch<UpdateCategoryResponse>(
    `/categories/${id}`,
    payload
  );

  return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await nextServer.delete(`/categories/${id}`);
};

export const getCurrentMonthStats = async (): Promise<CategoryStatItem[]> => {
  const response = await fetch('/api/stats/current-month');

  if (!response.ok) {
    throw new Error(`Failed to fetch stats: ${response.statusText}`);
  }

  return response.json();
};

//! Transactions

interface GetTransactionsParams {
  date?: string;
  search?: string;
}

export const createTransaction = async (
  payload: CreateTransactionRequest
): Promise<CreateTransactionResponse> => {
  const response = await nextServer.post<CreateTransactionResponse>(
    '/transactions',
    payload
  );

  return response.data;
};

export const getTransactions = async (
  type: TransactionType,
  params?: GetTransactionsParams
): Promise<TransactionItem[]> => {
  const response = await nextServer.get<TransactionItem[]>(
    `/transactions/${type}`,
    {
      params,
    }
  );

  return response.data;
};

export const updateTransaction = async (
  type: TransactionType,
  id: string,
  payload: UpdateTransactionRequest
): Promise<UpdateTransactionResponse> => {
  const response = await nextServer.patch<UpdateTransactionResponse>(
    `/transactions/${type}/${id}`,
    payload
  );

  return response.data;
};

export const deleteTransaction = async (
  id: string
): Promise<DeleteTransactionResponse> => {
  const response = await nextServer.delete<DeleteTransactionResponse>(
    `/transactions/${id}`
  );

  return response.data;
};
