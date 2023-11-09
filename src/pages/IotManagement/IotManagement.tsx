import './model/init';
import { Route } from 'react-router-dom';
import { getPath, MfeRoutes } from '@constants/routes';
import React from 'react';
import { CreateIot } from '@src/pages/IotManagement/CreateIot';
import { SwitchWithDefault } from '@sber-universe/om-component-library';

export const IotManagement = (): JSX.Element => {
  return (
    <SwitchWithDefault>
      <Route exact path={getPath(MfeRoutes.EDU_PLAN_INFO_IOT_CREATE)} component={CreateIot} />
    </SwitchWithDefault>
  );
};
