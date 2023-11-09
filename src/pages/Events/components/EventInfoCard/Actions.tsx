import React from 'react';
import { PublicateSwitch } from '@src/pages/Events/components/EventInfoCard/PublicateSwitch';
import { DeleteEventButton } from '@src/pages/Events/components/EventInfoCard/DeleteEventButton';

export type ActionsProps = { id: string; isPublished: boolean; endDate?: string };
export const Actions = ({ isPublished, id, endDate }: ActionsProps): JSX.Element => {
  return (
    <div className="leading-0 flex justify-between md:justify-normal items-center  space-x-[14px]">
      <PublicateSwitch id={id} isPublished={isPublished} endDate={endDate} />
      <DeleteEventButton id={id} isPublished={isPublished} />
    </div>
  );
};
