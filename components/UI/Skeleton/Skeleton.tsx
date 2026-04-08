'use client';

import css from './Skeleton.module.css';

type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  className?: string;
};

export default function Skeleton({
  width = '100%',
  height = 16,
  radius = 8,
  className,
}: SkeletonProps) {
  return (
    <span
      className={`${css.skeleton}${className ? ` ${className}` : ''}`}
      style={{ width, height, borderRadius: radius }}
      aria-hidden
    />
  );
}
