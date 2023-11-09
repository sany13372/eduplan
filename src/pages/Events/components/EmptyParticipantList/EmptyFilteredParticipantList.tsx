import { InfoWrapper } from '@sber-universe/om-component-library/dist/Info/InfoWrapper';
import { ReactComponent as EmptyFilteredListImage } from '@src/assets/images/filters.svg';
import React from 'react';

export const EmptyFilteredParticipantList = () => {
  return (
    <InfoWrapper
      title="Мы не нашли таких участников"
      subTitle="Измените параметры поиска
и повторите попытку"
    >
      <EmptyFilteredListImage />
    </InfoWrapper>
  );
};
