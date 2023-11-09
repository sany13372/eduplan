import { Typography } from '@kit-edu/typography';
import React from 'react';

type NameProps = {
  name: string;
  className?: string;
};
export const Name = ({ name, className = '' }: NameProps) => {
  return (
    <Typography size="14px" fontWeight="semibold" className={`truncate ${className}`} lineHeight="high">
      {name}
    </Typography>
  );
};
