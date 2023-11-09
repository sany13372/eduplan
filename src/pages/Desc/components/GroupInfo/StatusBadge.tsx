import { SimpleBadge } from '@src/components';
import React, { useMemo } from 'react';

type StatusBadgeProps = {
  value: boolean;
};
export const StatusBadge = ({ value }: StatusBadgeProps) => {
  const label = useMemo(() => (value ? 'Опубликовано' : 'Не опубликовано'), [value]);
  const variant = useMemo(() => (value ? 'primary' : 'default'), [value]);

  return (
    <div className="flex">
      <SimpleBadge label={label} variant={variant} />
    </div>
  );
};
