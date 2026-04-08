'use client';

import { useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from '@/components/Modals/Modal/Modal';
import { useUpdateTransaction } from '@/lib/hooks/useUpdateTransaction';
import { useCategories } from '@/lib/hooks/useCategories';
import { useUserStore } from '@/lib/store/userStore';
import type { TransactionItem } from '@/types/transaction';
import type { TransactionType } from '@/types/sharedTypes';
import css from './EditTransaction.module.css';

interface EditTransactionProps {
  onClose: () => void;
  transaction: TransactionItem;
  type: TransactionType;
}

const parseDate = (value: string | undefined) =>
  value ? new Date(`${value}T00:00:00`) : null;

const parseTime = (value: string | undefined) => {
  if (!value) {
    return null;
  }

  const [hours = '00', minutes = '00'] = value.split(':');
  const time = new Date();
  time.setHours(Number(hours), Number(minutes), 0, 0);
  return time;
};

const toLocalIsoDate = (value: Date) => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatTime = (value: Date) => {
  const hours = String(value.getHours()).padStart(2, '0');
  const minutes = String(value.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export default function EditTransaction({
  onClose,
  transaction,
  type,
}: EditTransactionProps) {
  const updateMutation = useUpdateTransaction();
  const { data: categories } = useCategories();
  const { user } = useUserStore();
  const currency = user?.currency ? user.currency.toUpperCase() : 'UAH';

  const categoryOptions = useMemo(
    () =>
      type === 'incomes'
        ? (categories?.incomes ?? [])
        : (categories?.expenses ?? []),
    [categories, type]
  );

  const formik = useFormik({
    initialValues: {
      date: parseDate(transaction?.date),
      time: parseTime(transaction?.time),
      sum: String(transaction?.sum ?? ''),
      comment: transaction?.comment ?? '',
      category: transaction?.category?._id ?? '',
    },
    validationSchema: Yup.object({
      date: Yup.date().nullable().required('Required'),
      time: Yup.date().nullable().required('Required'),
      category: Yup.string().required('Please select a category'),
      sum: Yup.number()
        .typeError('Required')
        .positive('Must be positive')
        .required('Required'),
      comment: Yup.string().max(250, 'Too long'),
    }),
    onSubmit: async values => {
      try {
        await updateMutation.mutateAsync({
          type,
          id: transaction._id,
          data: {
            date: values.date ? toLocalIsoDate(values.date) : transaction.date,
            time: values.time ? formatTime(values.time) : transaction.time,
            sum: Number(values.sum),
            comment: values.comment,
            category: values.category,
          },
        });

        toast.success('Transaction updated successfully');
        onClose();
      } catch (error: unknown) {
        const message =
          typeof error === 'object' &&
          error !== null &&
          'response' in error &&
          typeof (error as { response?: { data?: { message?: string } } })
            .response?.data?.message === 'string'
            ? ((error as { response?: { data?: { message?: string } } })
                .response?.data?.message ?? 'Failed to fetch transactions')
            : 'Failed to update transaction';
        toast.error(message);
      }
    },
  });

  return (
    <Modal isOpen onClose={onClose}>
      <form className={css.form} onSubmit={formik.handleSubmit}>
        <div className={css.row}>
          <label className={css.fieldGroup}>
            <span className={css.label}>Date</span>
            <div className={css.inputWithIcon}>
              <DatePicker
                selected={formik.values.date}
                onChange={(value: Date | null) =>
                  formik.setFieldValue('date', value)
                }
                onBlur={() => formik.setFieldTouched('date', true)}
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/yyyy"
                className={css.input}
                required
              />
              <span className={css.inputIcon}>
                <CalendarIcon />
              </span>
            </div>
            {formik.touched.date && formik.errors.date && (
              <span className={css.error}>{formik.errors.date.toString()}</span>
            )}
          </label>

          <label className={css.fieldGroup}>
            <span className={css.label}>Time</span>
            <div className={css.inputWithIcon}>
              <DatePicker
                selected={formik.values.time}
                onChange={(value: Date | null) =>
                  formik.setFieldValue('time', value)
                }
                onBlur={() => formik.setFieldTouched('time', true)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={5}
                timeCaption="Time"
                timeFormat="HH:mm"
                dateFormat="HH:mm"
                placeholderText="00:00"
                className={css.input}
                required
              />
              <span className={css.inputIcon}>
                <ClockIcon />
              </span>
            </div>
            {formik.touched.time && formik.errors.time && (
              <span className={css.error}>{formik.errors.time.toString()}</span>
            )}
          </label>
        </div>

        <label className={css.fieldGroup}>
          <span className={css.label}>Category</span>
          <select
            name="category"
            className={css.input}
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" disabled>
              Select category
            </option>
            {categoryOptions.map(item => (
              <option key={item._id} value={item._id}>
                {item.categoryName}
              </option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category && (
            <span className={css.error}>{formik.errors.category}</span>
          )}
        </label>

        <label className={css.fieldGroup}>
          <span className={css.label}>Sum</span>
          <div className={css.inputWithIcon}>
            <input
              className={css.input}
              type="number"
              min="0"
              step="0.01"
              name="sum"
              value={formik.values.sum}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span className={css.inputIcon}>{currency}</span>
          </div>
          {formik.touched.sum && formik.errors.sum && (
            <span className={css.error}>{formik.errors.sum}</span>
          )}
        </label>

        <label className={css.fieldGroup}>
          <span className={css.label}>Comment</span>
          <textarea
            className={css.textarea}
            name="comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength={250}
          />
          {formik.touched.comment && formik.errors.comment && (
            <span className={css.error}>{formik.errors.comment}</span>
          )}
        </label>

        <button
          type="submit"
          className={css.submitBtn}
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? 'Saving...' : 'Send'}
        </button>
      </form>
    </Modal>
  );
}
