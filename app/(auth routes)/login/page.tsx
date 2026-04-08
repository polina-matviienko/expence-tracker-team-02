'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { LoginRequest } from '@/types/authentication';
import AuthForm from '@/components/Auth/AuthForm';
import { login } from '@/lib/api/clientApi';

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginRequest>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginRequest> = {};
    if (!formData.email) newErrors.email = 'Email обязателен';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Неверный формат email';
    if (!formData.password) newErrors.password = 'Пароль обязателен';
    else if (formData.password.length < 8)
      newErrors.password = 'Пароль минимум 8 символов';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginRequest]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    startTransition(async () => {
      try {
        await login(formData);
        router.replace('/transactions/expenses');
      } catch {}
    });
  };

  return (
    <AuthForm
      mode="login"
      formData={formData}
      errors={errors}
      isPending={isPending}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
