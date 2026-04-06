// Zustand-стор для UI‑тоглов (бургер, панели, модалки).
import { create } from 'zustand';

interface UiState {
  isBurgerMenuOpen: boolean;
  isUserPanelOpen: boolean;
  isUserSettingsModalOpen: boolean;
  isCategoriesModalOpen: boolean;
  isEditTransactionModalOpen: boolean;
  selectedCategoryName: string;
  transactionType: 'incomes' | 'expenses';
  openBurgerMenu: () => void;
  closeBurgerMenu: () => void;
  toggleBurgerMenu: () => void;
  openUserPanel: () => void;
  closeUserPanel: () => void;
  toggleUserPanel: () => void;
  openUserSettingsModal: () => void;
  closeUserSettingsModal: () => void;
  openCategoriesModal: () => void;
  closeCategoriesModal: () => void;
  openEditTransactionModal: () => void;
  closeEditTransactionModal: () => void;
  setSelectedCategoryName: (name: string) => void;
  setTransactionType: (type: 'incomes' | 'expenses') => void;
}


export const useUiStore = create<UiState>((set) => ({
  isBurgerMenuOpen: false,
  isUserPanelOpen: false,
  isUserSettingsModalOpen: false,
  isCategoriesModalOpen: false,
  isEditTransactionModalOpen: false,
  selectedCategoryName: '',
  transactionType: 'expenses',

  openBurgerMenu: () => set({ isBurgerMenuOpen: true }),
  closeBurgerMenu: () => set({ isBurgerMenuOpen: false }),
  toggleBurgerMenu: () =>
    set((state) => ({ isBurgerMenuOpen: !state.isBurgerMenuOpen })),

  openUserPanel: () => set({ isUserPanelOpen: true }),
  closeUserPanel: () => set({ isUserPanelOpen: false }),
  toggleUserPanel: () =>
    set((state) => ({ isUserPanelOpen: !state.isUserPanelOpen })),

  openUserSettingsModal: () => set({ isUserSettingsModalOpen: true }),
  closeUserSettingsModal: () => set({ isUserSettingsModalOpen: false }),

  openCategoriesModal: () => set({ isCategoriesModalOpen: true }),
  closeCategoriesModal: () => set({ isCategoriesModalOpen: false }),

  openEditTransactionModal: () => set({ isEditTransactionModalOpen: true }),
  closeEditTransactionModal: () => set({ isEditTransactionModalOpen: false }),

  setSelectedCategoryName: (name: string) => set({ selectedCategoryName: name }),
  setTransactionType: (type: 'incomes' | 'expenses') => set({ transactionType: type }),
}));

