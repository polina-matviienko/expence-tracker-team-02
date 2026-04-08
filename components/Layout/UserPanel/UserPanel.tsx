'use client';

import { useModal } from '@/lib/hooks/use-modal-store';
import css from './UserPanel.module.css';

export const closeUserPanel = (onClose: () => void) => {
  onClose();
};

interface UserPanelProps {
  onClose: () => void;
  onBurgerClose?: () => void;
}

const UserPanel = ({ onClose, onBurgerClose }: UserPanelProps) => {
  const { onOpen } = useModal();

  const handleProfileClick = () => {
    onOpen('PROFILE_SETTINGS');
    onClose();
    onBurgerClose?.();
  };

  const handleLogout = () => {
    onOpen('LOGOUT_CONFIRM');
    closeUserPanel(onClose);
    onBurgerClose?.();
  };

  return (
    <div className={css.panelContainer}>
      <button type="button" className={css.panelBtn} onClick={handleProfileClick}>
        <svg className={css.icon} width="16" height="16">
          <use href="/icons.svg#icon-user" />
        </svg>
        Profile settings
      </button>

      <button type="button" className={css.panelBtn} onClick={handleLogout}>
        <svg className={css.icon} width="16" height="16">
          <use href="/icons.svg#icon-log-out" />
        </svg>
        Log out
      </button>
    </div>
  );
};

export default UserPanel;
