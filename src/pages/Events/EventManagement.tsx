import { Route } from 'react-router-dom';
import { getPath, MfeRoutes } from '@constants/routes';
import React, { useEffect } from 'react';
import { resetDomainData } from '@src/pages/Events/model';
import { SwitchWithDefault } from '@sber-universe/om-component-library';
import { UpdateEventParticipants } from '@src/pages/Events/UpdateEventParticipants';

import { CreateEvent } from './CreateEvent';
import { ViewEvent } from './ViewEvent';
import { UpdateEventInfo } from './UpdateEventInfo';

import './model/init';

export const EventManagement = (): JSX.Element => {
  useEffect(() => {
    return resetDomainData;
  }, []);
  return (
    <SwitchWithDefault>
      <Route exact path={getPath(MfeRoutes.EVENT_VIEW)} component={ViewEvent} />
      <Route exact path={getPath(MfeRoutes.EVENT_CREATE)} component={CreateEvent} />
      <Route exact path={getPath(MfeRoutes.EVENT_UPDATE_INFO)} component={UpdateEventInfo} />
      <Route exact path={getPath(MfeRoutes.EVENT_UPDATE_PARTICIPANTS)} component={UpdateEventParticipants} />
    </SwitchWithDefault>
  );
};
