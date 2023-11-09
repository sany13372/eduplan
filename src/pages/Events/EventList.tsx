import React, { useEffect } from 'react';
import { resetMfeBackGround, setMfeBackGround } from '@src/app/model';
import { EventListDefault } from '@src/pages/Events/EventListDefault';

export const EventList = ({ eduplanId }: { eduplanId: string }) => {
  useEffect(() => {
    setMfeBackGround('gray');
    return resetMfeBackGround;
  }, []);
  return <EventListDefault eduplanId={eduplanId} />;
};
