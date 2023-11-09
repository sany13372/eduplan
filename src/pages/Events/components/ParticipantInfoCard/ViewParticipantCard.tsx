import React from 'react';
import { Participant } from '@src/pages/Events/model/types';
import { ColorBadge, useMediaQuery } from '@sber-universe/om-component-library';

import { Card } from './Card';
import { Name } from './Name';

type VeiwParticipantCardProps = {
  data: Participant;
};

function AdditionalInfoMobile({ data }: VeiwParticipantCardProps) {
  return (
    <div className="flex items-center">
      <ColorBadge text={data.role.caption} className="mr-auto" />
      {data.course && <ColorBadge text={data.course} className="mr-2" />}
      {data.group && <ColorBadge text={data.group} />}
    </div>
  );
}

function AdditionalInfoDesktop({ data }: VeiwParticipantCardProps) {
  return (
    <div className="grid items-center grid-cols-3" style={{ width: 376 }} data-testid="participantInfo">
      <div className="flex">
        <ColorBadge text={data.role.caption} />
      </div>
      {data.course && (
        <div className="flex justify-center">
          <ColorBadge text={data.course} />
        </div>
      )}
      {data.group && (
        <div className="flex justify-end">
          <ColorBadge text={data.group} />
        </div>
      )}
    </div>
  );
}

export const ViewParticipantCard = ({ data }: VeiwParticipantCardProps) => {
  const isMobile = useMediaQuery({ type: 'down', breakpoint: 'md' });

  return (
    <Card>
      <Name name={data.fullName} className="flex-grow" />
      {isMobile ? <AdditionalInfoMobile data={data} /> : <AdditionalInfoDesktop data={data} />}
    </Card>
  );
};
