import { InfoWrapper } from '@sber-universe/om-component-library/dist/Info/InfoWrapper';
import { ReactComponent as EmptyParticipantListImage } from '@src/assets/images/participants.svg';
import React from 'react';

export const EmptyParticipantList = ({ buttonName }: { buttonName: string }) => {
  return (
    <InfoWrapper
      title="Участники еще не приглашены"
      subTitle={`Чтобы пригласить участников,
нажмите на кнопку «${buttonName}»`}
    >
      <EmptyParticipantListImage />
    </InfoWrapper>
  );
};
