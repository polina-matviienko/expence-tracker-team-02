'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import toast from 'react-hot-toast';

import Button from '@/components/UI/Button/Button';
import { Input } from '@/components/UI/input/input';
import css from './ProfileSettingsForm.module.css';

type Currency = {
  code: string;
  label: string;
  symbol: string;
};

const currencies: Currency[] = [
  { code: 'UAH', label: 'UAH', symbol: '₴' },
  { code: 'USD', label: 'USD', symbol: '$' },
  { code: 'EUR', label: 'EUR', symbol: '€' },
];

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  currency: yup.string().required(),
});

export type ProfileSettingsFormProps = {
  initialName: string;
  initialCurrency: string;
  avatarUrl: string | null | undefined;
  isAvatarLoading: boolean;
  onClose?: () => void;
  onSubmitProfile: (values: {
    name: string;
    currency: string;
  }) => Promise<void>;
  onAvatarUpload: (file: File) => Promise<void>;
  onAvatarRemove: () => Promise<void>;
};

const ProfileSettingsForm = ({
  initialName,
  initialCurrency,
  avatarUrl,
  isAvatarLoading,
  onSubmitProfile,
  onAvatarUpload,
  onAvatarRemove,
}: ProfileSettingsFormProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isCurrencyOpen, setCurrencyOpen] = useState(false);

  const toggleCurrency = () => setCurrencyOpen(prev => !prev);
  const handleCardClick = () => setCurrencyOpen(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_FILE_SIZE: number = 1.6 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File is too large. Max size is 2MB.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    await onAvatarUpload(file);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={css.card} onClick={handleCardClick}>
      <h2 className={css.title}>Profile settings</h2>

      <div className={css.avatarSection}>
        <div className={css.avatarRing}>
          <div className={css.avatar}>
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="User avatar"
                className={css.avatarImage}
                width={80}
                height={80}
              />
            ) : (
              <svg
                className={css.avatarIcon}
                width="80"
                height="80"
                aria-hidden
              >
                <use href="/icons.svg#icon-user" />
              </svg>
            )}
          </div>
        </div>

        <div className={css.avatarActions}>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className={css.hiddenInput}
          />
          <Button
            type="button"
            variant="gray"
            size="mobile"
            className={`${css.smallBtn} ${css.smallLeftBtn}`}
            onClick={() => fileInputRef.current?.click()}
            disabled={isAvatarLoading}
          >
            Upload new photo
          </Button>
          <Button
            type="button"
            variant="gray"
            size="mobile"
            className={`${css.smallBtn} ${css.smallRightBtn}`}
            onClick={onAvatarRemove}
            disabled={!avatarUrl || isAvatarLoading}
          >
            Remove
          </Button>
        </div>
      </div>

      <Formik
        initialValues={{
          name: initialName,
          currency: initialCurrency,
        }}
        validationSchema={validationSchema}
        onSubmit={async values => {
          await onSubmitProfile({
            name: values.name.trim(),
            currency: values.currency,
          });
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => {
          const currentCurrencyUI =
            currencies.find(c => c.code.toLowerCase() === values.currency) ||
            currencies[0];

          return (
            <Form className={css.form}>
              <div className={css.controlsRow}>
                <div
                  className={css.selectWrapper}
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className={css.select}
                    id="currency"
                    onClick={toggleCurrency}
                    aria-expanded={isCurrencyOpen}
                    aria-haspopup="listbox"
                  >
                    <span className={css.currencyValue}>
                      {currentCurrencyUI.symbol} {currentCurrencyUI.label}
                    </span>
                    <svg
                      width="18"
                      height="18"
                      className={`${css.chevron} ${isCurrencyOpen ? css.chevronOpen : ''}`}
                      aria-hidden
                    >
                      <use href="/icons.svg#icon-chevron-down" />
                    </svg>
                  </button>

                  {isCurrencyOpen && (
                    <ul className={css.options} role="listbox">
                      {currencies.map(currency => (
                        <li key={currency.code}>
                          <button
                            type="button"
                            className={`${css.optionBtn} ${
                              currency.code.toLowerCase() === values.currency
                                ? css.optionBtnActive
                                : ''
                            }`}
                            onClick={() => {
                              setFieldValue(
                                'currency',
                                currency.code.toLowerCase()
                              );
                              setCurrencyOpen(false);
                            }}
                            aria-label={`Select ${currency.label}`}
                          >
                            {currency.symbol} {currency.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className={css.inputWrapper}>
                  <Field
                    name="name"
                    as={Input}
                    type="text"
                    placeholder="Your Name"
                    aria-label="User name"
                    containerClassName={css.inputContainer}
                  />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className={css.errorText}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className={css.saveBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ProfileSettingsForm;
