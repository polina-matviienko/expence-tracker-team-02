'use client';
import { useRouter } from 'next/navigation';
import Button from '@/components/UI/Button/Button';
import Modal from '../Modal/Modal';
import css from './LogoutModal.module.css';
import { useModal } from '@/lib/hooks/use-modal-store';
import { useAuthStore } from '@/lib/store/authStore';
import toast from 'react-hot-toast';
import { logout } from '@/lib/api/clientApi';

function LogoutModal() {
  const router = useRouter();
  const onClose = useModal().onClose;
  const clearAuthState = useAuthStore(state => state.logout);

  const handleLogout = async () => {
    try {
      await logout();
      clearAuthState();
      router.push('/');
      onClose();
    } catch (error) {
      const err = error as Error;
      toast.error(`Something went wrong: ${err.message}}`);
      onClose();
    }
  };

  return (
    <Modal>
      <div className={css.logoutContent}>
        <p className={css.logoutText}>Are you sure you want to log out?</p>
        <div className={css.buttonGroup}>
          <Button
            onClick={handleLogout}
            size="mobile"
            className={css.btnLogout}
          >
            Log out
          </Button>
          <Button
            onClick={onClose}
            variant="gray"
            size="mobile"
            className={css.btnCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default LogoutModal;
