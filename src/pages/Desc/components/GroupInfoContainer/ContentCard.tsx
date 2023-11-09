import React, { FC } from 'react';
import { Card } from '@src/components';

export const ContentCard: FC = ({ children }) => {
  return <Card className="flex flex-col p-8 space-y-4">{children}</Card>;
};
