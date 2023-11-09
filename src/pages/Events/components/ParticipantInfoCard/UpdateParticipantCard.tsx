import React from 'react';
import { Participant } from '@src/pages/Events/model/types';

import { Card } from './Card';
import { Name } from './Name';
import { SelectRole } from './SelectRole';
import { RemoveParticipant } from './RemoveParticipant';
import { AdditionalInfo, AdditionalInfoContainer } from './AdditionalInfo';

type UpdateParticipantCardProps = {
  data: Participant;
};
export const UpdateParticipantCard = ({ data }: UpdateParticipantCardProps) => {
  return (
    <Card isLow>
      <Name name={data.fullName} className="flex-grow" />
      <AdditionalInfoContainer>
        <SelectRole item={data} />
        <AdditionalInfo group={data.group} course={data.course} />
      </AdditionalInfoContainer>
      <RemoveParticipant item={data} />
    </Card>
  );
};
