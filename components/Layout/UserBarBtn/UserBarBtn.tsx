'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import UserPanel from '../UserPanel/UserPanel';
import css from './UserBarBtn.module.css';
import Image from 'next/image';

type UserBarBtnProps = {
  onBurgerClose?: () => void;
};

const UserBarBtn = ({ onBurgerClose }: UserBarBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore(s => s.user);
  const userName = user?.name || 'User';

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={css.userBarContainer}>
      <button
        type="button"
        className={css.userBtn}
        aria-label="Open user menu"
        onClick={toggleMenu}
        aria-expanded={isOpen}
      >
        <div className={css.avatarWrapper}>
          {user?.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={userName}
              width={32}
              height={32}
              className={css.userAvatar}
            />
          ) : (
            <svg className={css.userIcon} width="16" height="16">
              <use href="/icons.svg#icon-user-avatar" />
            </svg>
          )}
        </div>

        <span className={css.userName}>{userName}</span>

        <div className={css.chevronWrapper}>
          <svg
            className={`${css.chevronIcon} ${isOpen ? css.isOpen : ''}`}
            width="20"
            height="20"
          >
            <use href="/icons.svg#icon-chevron-down" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <UserPanel
          onClose={() => setIsOpen(false)}
          onBurgerClose={onBurgerClose}
        />
      )}
    </div>
  );
};

export default UserBarBtn;
