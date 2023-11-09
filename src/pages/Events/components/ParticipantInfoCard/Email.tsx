import { Typography } from '@kit-edu/typography';
import React from 'react';

type EmailProps = {
  email?: string;
};
export const Email = ({ email }: EmailProps) => {
  return (
    <Typography size="14px" className="truncate flex-grow" lineHeight="high">
      {email}
    </Typography>
  );
};
