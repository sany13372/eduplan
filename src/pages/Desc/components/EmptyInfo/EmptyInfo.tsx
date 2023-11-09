import { InfoWrapper } from '@sber-universe/om-component-library/dist/Info/InfoWrapper';
import { ReactComponent as EmptyParticipantListImage } from '@src/assets/images/participants.svg';
import React from 'react';

export const EmptyInfo = () => {
  return (
    <InfoWrapper
      title="Описания для витрин образовательных программ не указаны"
      subTitle="Для ввода данных нажмите на кнопку «Настроить»"
      size="large"
    >
      <EmptyParticipantListImage />
    </InfoWrapper>
  );
};
