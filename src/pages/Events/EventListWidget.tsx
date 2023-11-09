import React from 'react';
import '@src/styles/index.css';
import '@sber-universe/om-component-library/dist/styles.css';
import '@src/styles/common.css';
import { EventListDefault } from '@src/pages/Events/EventListDefault';

export const EventListWidget = ({ eduplanId, isOnlyView }: { eduplanId?: string; isOnlyView?: boolean }) => {
  return (
    <div className={`${process.env.APP_NAME_VERSION} default`}>
      <EventListDefault eduplanId={eduplanId} isOnlyView={isOnlyView} />
    </div>
  );
};
