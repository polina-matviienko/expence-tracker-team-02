'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '../Modal/Modal';
import { useUiStore } from '@/lib/store/uiStore';
import { useCategories } from '@/lib/hooks/useCategoriesFixed';
import {
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from '@/lib/hooks/useCategoriesCRUD';
import { EditIcon, DeleteIcon, SelectIcon } from '@/components/UI/Icons/Icons';

import { toast } from 'react-hot-toast';
import styles from './CategoriesModal.module.css';

export default function CategoriesModal() {
  const {
    isCategoriesModalOpen,
    closeCategoriesModal,
    setSelectedCategory,
    transactionType,
  } = useUiStore();

  const { data: categoriesData, isLoading, isError } = useCategories();
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const [editingId, setEditingId] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      categoryName: '',
    },
    validationSchema: Yup.object({
      categoryName: Yup.string()
        .min(2, 'Too short')
        .max(20, 'Too long')
        .required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editingId) {
          await updateCategoryMutation.mutateAsync({
            id: editingId,
            categoryName: values.categoryName,
          });
          toast.success('Category updated');
        } else {
          await createCategoryMutation.mutateAsync({
            categoryName: values.categoryName,
            type: transactionType,
          });
          toast.success('Category added');
        }
        resetForm();
        setEditingId(null);
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Action failed');
      }
    },
  });

  // The API returns { incomes: [], expenses: [] }
  const currentCategories = categoriesData
    ? (categoriesData as any)[transactionType] || []
    : [];

  const handleEditInit = (id: string, name: string) => {
    setEditingId(id);
    formik.setFieldValue('categoryName', name);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategoryMutation.mutateAsync(id);
      toast.success('Category deleted');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  const handleSelect = (id: string, name: string) => {
    setSelectedCategory(id, name);
    closeCategoriesModal();
  };

  const handleClose = () => {
    setEditingId(null);
    formik.resetForm();
    closeCategoriesModal();
  };

  return (
    <Modal isOpen={isCategoriesModalOpen} onClose={handleClose}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {transactionType === 'incomes' ? 'Incomes' : 'Expenses'}
          </h2>
          <p className={styles.subtext}>All Category</p>
        </div>

        <div className={styles.list}>
          {isLoading ? (
            <p className={styles.loading}>Loading categories...</p>
          ) : isError ? (
            <p className={styles.errorText}>
              Failed to load categories. Please login first.
            </p>
          ) : currentCategories.length === 0 ? (
            <p className={styles.loading}>
              No categories found for {transactionType}
            </p>
          ) : (
            currentCategories.map((cat: any) => (
              <div key={cat._id} className={styles.item}>
                <span className={styles.name}>{cat.categoryName}</span>
                <div className={styles.actions}>
                  <button
                    className={styles.selectBtn}
                    onClick={() => handleSelect(cat._id, cat.categoryName)}
                    title="Select"
                  >
                    <SelectIcon />
                  </button>
                  <button
                    className={styles.editIconBtn}
                    onClick={() => handleEditInit(cat._id, cat.categoryName)}
                    title="Edit"
                  >
                    <EditIcon />
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(cat._id)}
                    disabled={deleteCategoryMutation.isPending}
                    title="Delete"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div className={styles.fieldWrapper}>
            <label className={styles.inputLabel}>New Category</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="categoryName"
                placeholder="Enter the text"
                value={formik.values.categoryName}
                onChange={formik.handleChange}
                className={styles.input}
              />
              <button
                type="submit"
                className={styles.actionBtn}
                disabled={
                  createCategoryMutation.isPending ||
                  updateCategoryMutation.isPending
                }
              >
                {createCategoryMutation.isPending ||
                updateCategoryMutation.isPending
                  ? '...'
                  : editingId
                    ? 'Edit'
                    : 'Add'}
              </button>
            </div>
            {formik.touched.categoryName && formik.errors.categoryName && (
              <span className={styles.errorText}>
                {formik.errors.categoryName}
              </span>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}
