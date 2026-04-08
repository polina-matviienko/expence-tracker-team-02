'use client';

import { useState } from 'react';
import UserPanel from '../UserPanel/UserPanel';
import css from './UserBarBtn.module.css';

type UserBarBtnProps = {
  onBurgerClose?: () => void;
};

const UserBarBtn = ({ onBurgerClose }: UserBarBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const userName = 'Alex Rybachok';

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
          <svg className={css.userIcon} width="16" height="16">
            <use href="/icons.svg#icon-user-avatar" />
          </svg>
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

      {isOpen && <UserPanel onClose={() => setIsOpen(false)} onBurgerClose={onBurgerClose} />}
    </div>
  );
};

export default UserBarBtn;
