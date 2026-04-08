'use client';

import React, { useEffect, useCallback } from 'react';
import styles from './Modal.module.css';
import { useModal } from '@/lib/hooks/use-modal-store';
import { createPortal } from 'react-dom';

interface BaseModalProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const Modal = ({
  children,
  isOpen: explicitIsOpen,
  onClose: explicitOnClose,
}: BaseModalProps) => {
  const storeModal = useModal();

  const isOpen =
    explicitIsOpen !== undefined ? explicitIsOpen : storeModal.isOpen;
  const onClose =
    explicitOnClose !== undefined ? explicitOnClose : storeModal.onClose;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <button
            onClick={onClose}
          className={styles.closeButton}
          aria-label="Close"
        >
          <svg className={styles.xIcon} width="20" height="20">
            <use href="/icons.svg#icon-x"></use>
          </svg>
        </button>
      </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
