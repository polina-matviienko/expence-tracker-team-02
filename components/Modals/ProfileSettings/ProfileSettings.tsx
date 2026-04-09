'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import Modal from '../Modal/Modal';
import { useModal } from '@/lib/hooks/use-modal-store';
import { useAuthStore } from '@/lib/store/authStore';
import {
  updateUserInfo,
  uploadAvatar,
  removeAvatar,
} from '@/lib/api/clientApi';
import ProfileSettingsForm from '@/components/UI/ProfileSettingsForm/ProfileSettingsForm';

const ProfileSettings = () => {
  const { onClose } = useModal();

  const user = useAuthStore(s => s.user);
  const setUser = useAuthStore(s => s.setUser);

  const [isAvatarLoading, setIsAvatarLoading] = useState(false);

  if (!user) return null;

  const handleSubmitProfile = async (values: {
    name: string;
    currency: string;
  }) => {
    try {
      await updateUserInfo({
        name: values.name,
        currency: values.currency as 'uah' | 'usd' | 'eur',
      });

      if (setUser) {
        setUser({
          ...user,
          name: values.name,
          currency: values.currency as 'uah' | 'usd' | 'eur',
        });
      }

      toast.success('Profile successfully updated!');
    } catch (error) {
      let serverErrorMsg =
        'Can not update profile info. Please try again later.';

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>;
        serverErrorMsg = axiosError.response?.data?.message || serverErrorMsg;
      }

      toast.error(serverErrorMsg);
      throw error;
    }
  };

  const handleAvatarUpload = async (file: File) => {
    setIsAvatarLoading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await uploadAvatar(formData);

      if (setUser) {
        setUser({
          ...user,
          avatarUrl: response.avatarUrl,
        });
      }
      toast.success('Avatar uploaded!');
    } catch (error) {
      let serverErrorMsg = 'Error uploading avatar.';

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>;
        serverErrorMsg = axiosError.response?.data?.message || serverErrorMsg;
      }

      toast.error(serverErrorMsg);
    } finally {
      setIsAvatarLoading(false);
    }
  };

  const handleAvatarRemove = async () => {
    setIsAvatarLoading(true);
    try {
      await removeAvatar();

      if (setUser) {
        setUser({
          ...user,
          avatarUrl: '',
        });
      }
      toast.success('Avatar removed!');
    } catch (error) {
      let serverErrorMsg = 'Error removing avatar.';

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>;
        serverErrorMsg = axiosError.response?.data?.message || serverErrorMsg;
      }

      toast.error(serverErrorMsg);
    } finally {
      setIsAvatarLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <ProfileSettingsForm
        initialName={user.name || ''}
        initialCurrency={user.currency?.toLowerCase() || 'uah'}
        avatarUrl={user.avatarUrl}
        isAvatarLoading={isAvatarLoading}
        onClose={onClose}
        onSubmitProfile={handleSubmitProfile}
        onAvatarUpload={handleAvatarUpload}
        onAvatarRemove={handleAvatarRemove}
      />
    </Modal>
  );
};

export default ProfileSettings;
