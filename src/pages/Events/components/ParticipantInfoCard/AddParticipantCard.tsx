import React from 'react';
import { Participant } from '@src/pages/Events/model/types';

import { AddParticipantCheckBox } from './AddParticipantCheckBox';
import { SelectRole } from './SelectRole';
import { Card } from './Card';
import { Name } from './Name';
import { Email } from './Email';
import { AdditionalInfo, AdditionalInfoContainer } from './AdditionalInfo';

type AddParticipantCardProps = {
  data: Participant;
};

export const AddParticipantCard = ({ data }: AddParticipantCardProps) => {
  return (
    <Card>
      <AddParticipantCheckBox item={data} />
      <Name name={data.fullName} className="w-[288px] flex-shrink-0" />
      <Email email={data.email} />
      <AdditionalInfoContainer>
        <SelectRole item={data} />
        <AdditionalInfo group={data.group} course={data.course} />
      </AdditionalInfoContainer>
    </Card>
  );
};
