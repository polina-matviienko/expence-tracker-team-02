'use client';

import { useModal } from '@/lib/hooks/use-modal-store';
import css from './UserPanel.module.css';

interface UserPanelProps {
  onClose: () => void;
}

const UserPanel = ({ onClose }: UserPanelProps) => {
  const { onOpen } = useModal();

  const handleProfileClick = () => {
    onOpen('PROFILE_SETTINGS');
    onClose();
  };

  return (
    <div className={css.panelContainer}>
      <button type="button" className={css.panelBtn} onClick={handleProfileClick}>
        <svg className={css.icon} width="16" height="16">
          <use href="/icons.svg#icon-user" />
        </svg>
        Profile settings
      </button>

      <button type="button" className={css.panelBtn} onClick={onClose}>
        <svg className={css.icon} width="16" height="16">
          <use href="/icons.svg#icon-log-out" />
        </svg>
        Log out
      </button>
    </div>
  );
};

export default UserPanel;
