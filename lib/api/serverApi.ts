import { cookies } from 'next/headers';
import { nextServer } from './api';
import { AxiosResponse } from 'axios';
import {
  CurrentUserResponse,
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
import type { CategoryStatItem } from '@/types/stats';
import type {
  CreateTransactionRequest,
  CreateTransactionResponse,
  DeleteTransactionResponse,
  TransactionItem,
  TransactionType,
  UpdateTransactionRequest,
  UpdateTransactionResponse,
} from '@/types/transaction';

export type SessionResponse = {
  message: string;
};

interface GetTransactionsParams {
  date?: string;
  search?: string;
}

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};

//! AUTH

export const checkSessionServer = async (): Promise<
  AxiosResponse<SessionResponse>
> => {
  const response = await nextServer.get<SessionResponse>('/auth/session', {
    headers: await getAuthHeaders(),
  });
  return response;
};

//! USER

export const currentUserServer = async (): Promise<CurrentUserResponse> => {
  const { data } = await nextServer.get<CurrentUserResponse>('/users/current', {
    headers: await getAuthHeaders(),
  });
  return data;
};

export const updateUserInfoServer = async (
  payload: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  const { data } = await nextServer.patch<UpdateUserResponse>(
    '/users/info',
    payload,
    {
      headers: await getAuthHeaders(),
    }
  );
  return data;
};

export const removeAvatarServer = async (): Promise<void> => {
  await nextServer.delete('/users/avatar', {
    headers: await getAuthHeaders(),
  });
};

//! CATEGORY

export const getCategoriesServer = async (): Promise<CategoriesResponse> => {
  const { data } = await nextServer.get<CategoriesResponse>('/categories', {
    headers: await getAuthHeaders(),
  });
  return data;
};

export const createCategoryServer = async (
  payload: CreateCategoryRequest
): Promise<Category> => {
  const { data } = await nextServer.post<Category>('/categories', payload, {
    headers: await getAuthHeaders(),
  });
  return data;
};

export const updateCategoryServer = async (
  id: string,
  payload: UpdateCategoryRequest
): Promise<UpdateCategoryResponse> => {
  const { data } = await nextServer.patch<UpdateCategoryResponse>(
    `/categories/${id}`,
    payload,
    {
      headers: await getAuthHeaders(),
    }
  );
  return data;
};

export const deleteCategoryServer = async (id: string): Promise<void> => {
  await nextServer.delete(`/categories/${id}`, {
    headers: await getAuthHeaders(),
  });
};

//! STATS

export const getCurrentMonthStatsServer = async (): Promise<
  CategoryStatItem[]
> => {
  const { data } = await nextServer.get<CategoryStatItem[]>(
    '/stats/categories/current-month',
    {
      headers: await getAuthHeaders(),
    }
  );
  return data;
};

//! TRANSACTIONS

export const getTransactions = async (
  type: TransactionType,
  params?: GetTransactionsParams
): Promise<TransactionItem[]> => {
  const { data } = await nextServer.get<TransactionItem[]>(
    `/transactions/${type}`,
    {
      params,
    }
  );
  return data;
};

export const createTransactionServer = async (
  payload: CreateTransactionRequest
): Promise<CreateTransactionResponse> => {
  const { data } = await nextServer.post<CreateTransactionResponse>(
    '/transactions',
    payload,
    {
      headers: await getAuthHeaders(),
    }
  );
  return data;
};

export const updateTransactionServer = async (
  type: TransactionType,
  id: string,
  payload: UpdateTransactionRequest
): Promise<UpdateTransactionResponse> => {
  const { data } = await nextServer.patch<UpdateTransactionResponse>(
    `/transactions/${type}/${id}`,
    payload,
    {
      headers: await getAuthHeaders(),
    }
  );
  return data;
};

export const deleteTransactionServer = async (
  type: TransactionType,
  id: string
): Promise<DeleteTransactionResponse> => {
  const { data } = await nextServer.delete<DeleteTransactionResponse>(
    `/transactions/${type}/${id}`,
    {
      headers: await getAuthHeaders(),
    }
  );
  return data;
};
