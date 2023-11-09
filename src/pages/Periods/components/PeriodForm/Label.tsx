import { Typography } from '@kit-edu/typography';
import React from 'react';

type LabelProps = {
  title: string;
};
export const Label: React.FC<LabelProps> = ({ title, children }) => {
  return (
    <div className="space-y-2">
      <Typography as="h5" size="12px" color="medium">
        {title}
      </Typography>
      {children}
    </div>
  );
};
