import React, { FC } from 'react';
import { Card } from '@src/components';
import { Typography } from '@kit-edu/typography';

type TitleCardProps = {
  title: string;
};

export const TitleCard: FC<TitleCardProps> = ({ title, children }) => {
  return (
    <Card className="flex items-center space-x-8 justify-between px-8 py-4">
      <Typography as="h3" fontWeight="semibold" size="20px">
        {title}
      </Typography>
      {children}
    </Card>
  );
};
