'use client';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-hot-toast';
import { useUserStore } from '@/lib/store/userStore';
import { useUiStore } from '@/lib/store/uiStore';
// import { useCategoryStore } from '@/lib/store/categoryStore'; // Currently problematic to read
import { useCreateTransaction } from '@/lib/hooks/useCreateTransactionFixed';
import styles from './TransactionForm.module.css';
import { 
  CalendarIcon, 
  ClockIcon, 
  IncomeIndicatorIcon, 
  ExpenseIndicatorIcon 
} from '@/components/UI/Icons/Icons';
import Button from '@/components/UI/Button/Button';

interface TransactionFormProps {
  transactionType: 'incomes' | 'expenses';
}

export default function TransactionForm({ transactionType }: TransactionFormProps) {
  const { openCategoriesModal, selectedCategoryName, selectedCategoryId, setSelectedCategory } = useUiStore();
  const { user } = useUserStore();
  const currency = user?.currency ? user.currency.toUpperCase() : 'UAH';
  const createTransactionMutation = useCreateTransaction();
  
  const formik = useFormik({
    initialValues: {
      type: transactionType,
      date: null,
      time: '',
      category: '',
      sum: '',
      comment: '',
    },
    validationSchema: Yup.object({
      type: Yup.string().required('Required'),
      date: Yup.date().required('Required'),
      time: Yup.string().required('Required'),
      category: Yup.string().required('Please select a category'),
      sum: Yup.number().positive('Must be positive').required('Required'),
      comment: Yup.string().max(250, 'Too long'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload: any = {
          type: values.type as 'incomes' | 'expenses',
          date: values.date.toISOString().split('T')[0],
          time: values.time,
          category: selectedCategoryId,
          sum: Number(values.sum),
        };
        
        if (values.comment && values.comment.trim() !== '') {
          payload.comment = values.comment.trim();
        }

        await createTransactionMutation.mutateAsync(payload);
        toast.success('Transaction created successfully!');
        resetForm();
        setSelectedCategory('', ''); // Clear after success
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to create transaction');
      }
    },
  });

  // Sync type with prop and store
  useEffect(() => {
    formik.setFieldValue('type', transactionType);
    useUiStore.getState().setTransactionType(transactionType);
  }, [transactionType]);

  // Sync selected category from store
  useEffect(() => {
    if (selectedCategoryName) {
      formik.setFieldValue('category', selectedCategoryName);
    }
  }, [selectedCategoryName]);

  const handleCategoryClick = () => {
    useUiStore.getState().setTransactionType(formik.values.type as 'incomes' | 'expenses');
    openCategoriesModal();
  };

  return (

    <div className={styles.container}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.typeSelector}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="type"
              value="expenses"
              checked={formik.values.type === 'expenses'}
              onChange={(e) => {
                const newType = e.target.value as 'incomes' | 'expenses';
                formik.resetForm({
                  values: {
                    ...formik.initialValues,
                    type: newType,
                  }
                });
                useUiStore.getState().setTransactionType(newType);
                setSelectedCategory('', '');
              }}
            />
            <span className={styles.radioCustom}>Expense</span>
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="type"
              value="incomes"
              checked={formik.values.type === 'incomes'}
              onChange={(e) => {
                const newType = e.target.value as 'incomes' | 'expenses';
                formik.resetForm({
                  values: {
                    ...formik.initialValues,
                    type: newType,
                  }
                });
                useUiStore.getState().setTransactionType(newType);
                setSelectedCategory('', '');
              }}
            />
            <span className={styles.radioCustom}>Income</span>
          </label>
        </div>

        <div className={styles.row}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Date</label>
            <div className={styles.inputWithIcon}>
              <DatePicker
                selected={formik.values.date}
                onChange={(date) => formik.setFieldValue('date', date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="mm/dd/yyyy"
                className={styles.input}
              />
              <span className={styles.inputIcon}><CalendarIcon /></span>
            </div>
            {formik.touched.date && formik.errors.date && (
              <span className={styles.error}>{formik.errors.date.toString()}</span>
            )}
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Time</label>
            <div className={styles.inputWithIcon}>
              <DatePicker
                selected={
                  (() => {
                    if (!formik.values.time) return null;
                    const [hours, minutes] = formik.values.time.split(':');
                    const d = new Date();
                    d.setHours(Number(hours) || 0, Number(minutes) || 0, 0, 0);
                    return d;
                  })()
                }
                onChange={(date) => {
                  if (date) {
                    formik.setFieldValue(
                      'time',
                      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
                    );
                  }
                }}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                timeFormat="HH:mm"
                dateFormat="HH:mm"
                placeholderText="00:00:00"
                className={styles.input}
              />
              <span className={styles.inputIcon}><ClockIcon /></span>
            </div>
            {formik.touched.time && formik.errors.time && (
              <span className={styles.error}>{formik.errors.time}</span>
            )}
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Category</label>
          <input
            type="text"
            placeholder="Different"
            readOnly
            value={formik.values.category}
            onClick={handleCategoryClick}
            onFocus={handleCategoryClick}
            className={`${styles.input} ${styles.clickable}`}
          />
          {formik.touched.category && formik.errors.category && (
            <span className={styles.error}>{formik.errors.category}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Sum</label>
          <div className={styles.inputWithIcon}>
            <input
              type="number"
              name="sum"
              placeholder="Enter the sum"
              value={formik.values.sum}
              onChange={formik.handleChange}
              className={styles.input}
            />
            <span className={styles.inputIcon}>{currency}</span>
          </div>
          {formik.touched.sum && formik.errors.sum && (
            <span className={styles.error}>{formik.errors.sum}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Comment</label>
          <textarea
            name="comment"
            placeholder="Enter the text"
            value={formik.values.comment}
            onChange={formik.handleChange}
            className={styles.textarea}
          />
          {formik.touched.comment && formik.errors.comment && (
            <span className={styles.error}>{formik.errors.comment}</span>
          )}
        </div>

        <Button 
          type="submit" 
          variant="green"
          className={styles.submitBtn}
          disabled={createTransactionMutation.isPending}
        >
          {createTransactionMutation.isPending ? '...' : 'Add'}
        </Button>
      </form>
    </div>
  );
}
