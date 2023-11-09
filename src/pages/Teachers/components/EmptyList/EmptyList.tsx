import React from 'react';
import { InfoWrapper } from '@sber-universe/om-component-library';
import { ReactComponent as EmptyParticipantListImage } from '@src/assets/images/participants.svg';

export const EmptyList = () => {
  return (
    <InfoWrapper
      title="В образовательное пространство
ещё не добавлены преподаватели"
      subTitle="Настройка списка преподавателей
мероприятий плана обучения невозможна"
    >
      <EmptyParticipantListImage />
    </InfoWrapper>
  );
};
