import axios from 'axios';
import { useLoadingStore } from '../hooks/use-loading-store';

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

if (typeof window !== 'undefined') {
  nextServer.interceptors.request.use(
    (config) => {
      useLoadingStore.getState().start();
      return config;
    },
    (error) => {
      useLoadingStore.getState().finish();
      return Promise.reject(error);
    }
  );

  nextServer.interceptors.response.use(
    (response) => {
      useLoadingStore.getState().finish();
      return response;
    },
    (error) => {
      useLoadingStore.getState().finish();
      return Promise.reject(error);
    }
  );
}
