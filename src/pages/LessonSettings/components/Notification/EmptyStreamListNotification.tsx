import { SolidNotification } from '@src/components';
import React from 'react';

export const EmptyStreamListNotification = () => {
  return (
    <SolidNotification
      variant="embedded"
      template="Чтобы добавить первый поток занятия, нажмите кнопку «Добавить поток»"
    />
  );
};
