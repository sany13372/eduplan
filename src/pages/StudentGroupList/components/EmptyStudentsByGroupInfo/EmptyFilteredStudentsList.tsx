import { InfoWrapper } from '@sber-universe/om-component-library/dist/Info/InfoWrapper';
import { ReactComponent as EmptyFilteredListImage } from '@src/assets/images/filters.svg';
import React, { FC } from 'react';

export const EmptyFilteredStudentsList: FC = () => {
  return (
    <InfoWrapper
      title="Такие обучающиеся не найдены"
      subTitle="Измените параметры поиска
и повторите попытку"
    >
      <EmptyFilteredListImage />
    </InfoWrapper>
  );
};
