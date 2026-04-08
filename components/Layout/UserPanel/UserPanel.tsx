'use client';

import css from './UserPanel.module.css';

export const closeUserPanel = (onClose: () => void) => {
  onClose();
};

interface UserPanelProps {
  onClose: () => void;
}

const UserPanel = ({ onClose }: UserPanelProps) => {
  return (
    <div className={css.panelContainer}>
      <button
        type="button"
        className={css.panelBtn}
        onClick={() => closeUserPanel(onClose)}
      >
        <svg className={css.icon} width="16" height="16">
          <use href="/icons.svg#icon-user" />
        </svg>
        Profile settings
      </button>

      <button
        type="button"
        className={css.panelBtn}
        onClick={() => closeUserPanel(onClose)}
      >
        <svg className={css.icon} width="16" height="16">
          <use href="/icons.svg#icon-log-out" />
        </svg>
        Log out
      </button>
    </div>
  );
};

export default UserPanel;
