import React, { FC } from 'react';
import { InfoWrapper } from '@sber-universe/om-component-library/dist/Info/InfoWrapper';
import { ReactComponent as EmptyParticipantListImage } from '@src/assets/images/participants.svg';

export const EmptyStudentsList: FC = () => {
  return (
    <InfoWrapper
      title="Для плана обучения не добавлены
      учебные группы и обучающиеся"
    >
      <EmptyParticipantListImage />
    </InfoWrapper>
  );
};
