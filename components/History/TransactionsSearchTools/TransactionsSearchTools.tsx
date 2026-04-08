'use client';

import { ChangeEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from './TransactionsSearchTools.module.css';

interface TransactionsSearchToolsProps {
  search: string;
  date: string;
  onSearchChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

export default function TransactionsSearchTools({
  search,
  date,
  onSearchChange,
  onDateChange,
}: TransactionsSearchToolsProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const selectedDate = date ? new Date(`${date}T00:00:00`) : null;

  const handlePickerChange = (value: Date | null) => {
    if (!value) {
      onDateChange('');
      return;
    }

    const localDate = new Date(
      value.getTime() - value.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 10);
    onDateChange(localDate);
  };

  return (
    <div className={css.wrapper}>
      <label className={css.searchLabel}>
        <span className={css.srOnly}>Search by comment</span>
        <div className={css.inputWithIcon}>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search for anything.."
            className={`${css.input} ${css.searchInput}`}
          />
          <span className={css.inputIcon}>
            <svg aria-hidden width={20} height={20} className={css.toolIcon}>
              <use href="/icons.svg#icon-search" />
            </svg>
          </span>
        </div>
      </label>

      <label className={css.dateLabel}>
        <span className={css.srOnly}>Filter by date</span>
        <div className={css.inputWithIcon}>
          <DatePicker
            selected={selectedDate}
            onChange={handlePickerChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            className={`${css.input} ${css.dateInput}`}
          />
          <span className={css.inputIcon}>
            <svg aria-hidden width={20} height={20} className={css.toolIcon}>
              <use href="/icons.svg#icon-calendar" />
            </svg>
          </span>
        </div>
      </label>
    </div>
  );
}
