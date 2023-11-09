import React from 'react';
import { Route } from 'react-router-dom';
import { getPath, MfeRoutes } from '@constants/routes';
import { UpdateIotTemplate } from '@src/pages/IotTemplateManagement/UpdateIotTemplate';
import { CreateIotTemplate } from '@src/pages/IotTemplateManagement/CreateIotTemplate';
import { SwitchWithDefault } from '@sber-universe/om-component-library';

import './model/init';

export const IotTemplateManagement = (): JSX.Element => {
  return (
    <SwitchWithDefault>
      <Route exact path={getPath(MfeRoutes.EDU_PLAN_INFO_IOT_TEMPLATE_CREATE)} component={CreateIotTemplate} />
      <Route exact path={getPath(MfeRoutes.EDU_PLAN_INFO_IOT_TEMPLATE_EDIT)} component={UpdateIotTemplate} />
    </SwitchWithDefault>
  );
};
