'use client';

import { useEffect, useRef, useState } from 'react';
import Modal from '../Modal/Modal';
import { useModal } from '@/lib/hooks/use-modal-store';
import Button from '@/components/UI/Button/Button';
import { Input } from '@/components/UI/input/input';
import css from './ProfileSettings.module.css';

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

const ProfileSettings = () => {
  const { onClose } = useModal();
  const [isCurrencyOpen, setCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const modalEl = cardRef.current?.closest('.modal') as HTMLElement | null;
    if (!modalEl) return;
    const prevOverflow = modalEl.style.overflow;
    modalEl.style.overflow = 'hidden';

    return () => {
      modalEl.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflowX;
    const prevBody = body.style.overflowX;
    html.style.overflowX = 'hidden';
    body.style.overflowX = 'hidden';
    return () => {
      html.style.overflowX = prevHtml;
      body.style.overflowX = prevBody;
    };
  }, []);

  const toggleCurrency = () => setCurrencyOpen((prev) => !prev);

  const handleSelectCurrency = (currency: Currency) => {
    setSelectedCurrency(currency);
    setCurrencyOpen(false);
  };

  const handleCardClick = () => setCurrencyOpen(false);

  return (
    <Modal onClose={onClose}>
      <div ref={cardRef} className={css.card} onClick={handleCardClick}>
        <h2 className={css.title}>Profile settings</h2>

        <div className={css.avatarSection}>
          <div className={css.avatarRing}>
            <div className={css.avatar}>
              <svg className={css.avatarIcon} aria-hidden>
                <use href="/icons.svg#icon-user" />
              </svg>
            </div>
          </div>

          <div className={css.avatarActions}>
            <Button
              type="button"
              variant="gray"
              size="mobile"
              className={`${css.smallBtn} ${css.smallLeftBtn}`}
            >
              Upload new photo
            </Button>
            <Button
              type="button"
              variant="gray"
              size="mobile"
              className={`${css.smallBtn} ${css.smallRightBtn}`}
            >
              Remove
            </Button>
          </div>
        </div>

        <form className={css.form}>
          <div className={css.controlsRow}>
            <div
              className={css.selectWrapper}
              onClick={(e) => e.stopPropagation()}
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
                  {selectedCurrency.symbol} {selectedCurrency.label}
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
                  {currencies.map((currency) => (
                    <li key={currency.code}>
                      <button
                        type="button"
                        className={`${css.optionBtn} ${
                          currency.code === selectedCurrency.code
                            ? css.optionBtnActive
                            : ''
                        }`}
                        onClick={() => handleSelectCurrency(currency)}
                        aria-label={`Select ${currency.label}`}
                      >
                        {currency.symbol} {currency.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Input
              type="text"
              placeholder="Alex Rybachok"
              aria-label="User name"
              containerClassName={css.inputContainer}
            />
          </div>

          <Button type="button" className={css.saveBtn}>
            Save
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ProfileSettings;
