import { InfoWrapper } from '@sber-universe/om-component-library/dist/Info/InfoWrapper';
import { ReactComponent as EmptyFilteredListImage } from '@src/assets/images/filters.svg';
import React from 'react';
import { useIsOnlyView } from '@src/pages/Events/model/hooks';

import { IMAGE_PROPS } from './constants';

export const EmptyFilteredList = () => {
  const isOnlyView = useIsOnlyView();
  return (
    <InfoWrapper
      title={isOnlyView ? 'Такие события ещё не добавлены' : 'Такие события не найдены'}
      subTitle="Измените параметры поиска
и повторите попытку"
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <EmptyFilteredListImage {...IMAGE_PROPS} />
    </InfoWrapper>
  );
};
