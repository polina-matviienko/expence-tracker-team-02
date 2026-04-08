import React from 'react';
import css from './input.module.css';

type IconType = React.ReactNode | string;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  iconLeft?: IconType;
  iconRight?: IconType;
  fullWidth?: boolean;
  containerClassName?: string;
}

export const Input = ({
  label,
  error,
  iconLeft,
  iconRight,
  fullWidth,
  containerClassName,
  className,
  ...props
}: InputProps) => {
  const renderIcon = (icon?: IconType) => {
    if (!icon) return null;
    if (typeof icon === 'string') {
      return (
        <svg className={css.icon} aria-hidden>
          <use href={`/icons.svg#${icon}`} />
        </svg>
      );
    }
    return icon;
  };

  return (
    <div
      className={`${css.wrapper} ${fullWidth ? css.fullWidth : ''} ${
        containerClassName ?? ''
      }`.trim()}
    >
      {label && <label className={css.label}>{label}</label>}

      <div className={`${css.field} ${error ? css.error : ''}`.trim()}>
        {iconLeft && <span className={css.iconLeft}>{renderIcon(iconLeft)}</span>}

        <input
          {...props}
          className={`${css.input} ${className ?? ''}`.trim()}
          aria-invalid={Boolean(error)}
        />

        {iconRight && (
          <span className={css.iconRight}>{renderIcon(iconRight)}</span>
        )}
      </div>

      {error && <p className={css.errorText}>{error}</p>}
    </div>
  );
};
