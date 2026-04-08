'use client';

import Link from 'next/link';
import Image from 'next/image';
import css from './AuthForm.module.css';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import Button from '@/components/UI/Button/Button';
import heroPhone from '@/public/img/Rectangle1xphone.png';
import heroTab from '@/public/img/Rectangle1xtab.png';
import heroDesk from '@/public/img/Rectangle1xdesk.png';
import { registerUser, loginUser } from '@/lib/api/authApi';
import DecorativeTab from '@/components/Auth/DecorationTab/DecorationTab';
import type { LoginRequest, RegisterRequest } from '@/types/authentication';

interface AuthFormProps {
  mode: 'login' | 'register';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const isRegister = mode === 'register';

  const [formData, setFormData] = useState<RegisterRequest | LoginRequest>(
    isRegister
      ? { name: '', email: '', password: '' }
      : { email: '', password: '' }
  );

  const [errors, setErrors] = useState<Partial<RegisterRequest & LoginRequest>>(
    {}
  );

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterRequest & LoginRequest> = {};

    if (isRegister && !('name' in formData && formData.name?.trim())) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    startTransition(async () => {
      try {
        if (isRegister) {
          await registerUser(formData as RegisterRequest);
        } else {
          await loginUser(formData as LoginRequest);
        }
        router.replace('/transactions/expenses');
      } catch {}
    });
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const description = isRegister
    ? 'Step into a world of hassle-free expense management! Your journey towards financial mastery begins here.'
    : 'Welcome back to effortless expense tracking! Your financial dashboard awaits.';

  return (
    <div>
      <div className={`${css.container} ${css.deskContainer}`}>
        <div className={css.bgImage}>
          <picture>
            <source srcSet={heroDesk.src} media="(min-width: 1440px)" />
            <source srcSet={heroTab.src} media="(min-width: 768px)" />
            <Image
              src={heroPhone}
              alt="Hero Image"
              style={{ width: '100%', height: 'auto' }}
            />
          </picture>
          <div className={css.decorativeWrapper}>
            <DecorativeTab />
          </div>
        </div>
        <div>
          <div className={css.header}>
            <h1 className={css.title}>{isRegister ? 'Sign Up' : 'Sign In'}</h1>
            <p className={css.description}>{description}</p>
          </div>

          <form onSubmit={handleSubmit} className={css.form}>
            {isRegister && (
              <div className={css.field}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={(formData as RegisterRequest).name || ''}
                  onChange={handleChange}
                  className={`${css.input} ${errors.name ? css.error : ''}`}
                  disabled={isPending}
                />
                {errors.name && (
                  <span className={css.errorText}>{errors.name}</span>
                )}
              </div>
            )}

            <div className={css.field}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`${css.input} ${errors.email ? css.error : ''}`}
                disabled={isPending}
              />
              {errors.email && (
                <span className={css.errorText}>{errors.email}</span>
              )}
            </div>

            <div className={css.field}>
              <div className={css.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${css.input} ${errors.password ? css.error : ''}`}
                  disabled={isPending}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className={css.eyeButton}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="24" height="24">
                      <use href="/icons.svg#icon-eye-off" />
                    </svg>
                  ) : (
                    <svg width="24" height="24">
                      <use href="/icons.svg#eye" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <span className={css.errorText}>{errors.password}</span>
              )}
            </div>

            <Button
              type="submit"
              variant="green"
              size="desktop"
              disabled={isPending}
              className={`${css.submitButton} ${
                isRegister ? css.submitButtonRegister : css.submitButtonLogin
              }`}
            >
              {isPending
                ? isRegister
                  ? 'Signing Up...'
                  : 'Signing In...'
                : isRegister
                  ? 'Sign Up'
                  : 'Sign In'}
            </Button>
          </form>

          <div className={css.switch}>
            {isRegister ? (
              <>
                Already have an account?{' '}
                <Link href="/login" className={css.link}>
                  Sign In
                </Link>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <Link href="/register" className={css.link}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
