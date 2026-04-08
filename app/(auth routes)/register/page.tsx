'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api/clientApi';
import type { RegisterRequest } from '@/types/authentication';
import AuthForm from '@/components/Auth/AuthForm';

export default function RegisterPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState<RegisterRequest>({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<RegisterRequest>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterRequest> = {};
    if (!formData.name.trim()) newErrors.name = 'Имя обязательно';
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
    if (errors[name as keyof RegisterRequest]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    startTransition(async () => {
      try {
        await register(formData);
        router.replace('/transactions/expenses');
      } catch {}
    });
  };

  return (
    <AuthForm
      mode="register"
      formData={formData}
      errors={errors}
      isPending={isPending}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
