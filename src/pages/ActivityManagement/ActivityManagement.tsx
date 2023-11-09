import { Route, useParams } from 'react-router-dom';
import { EduPlanParams, getPath, MfeRoutes } from '@constants/routes';
import React, { useEffect } from 'react';
import { CreateActivityGroup } from '@src/pages/ActivityManagement/CreateActivityGroup';
import { UpdateActivity } from '@src/pages/ActivityManagement/UpdateActivity';
import { CreateActivity } from '@src/pages/ActivityManagement/CreateActivity';
import { UpdateActivityGroup } from '@src/pages/ActivityManagement/UpdateActivityGroup';
import { $getEduProgramId, getEduProgramId, resetDomainData } from '@src/pages/ActivityManagement/model';
import { useStore } from 'effector-react';
import './model/init';
import { ActivityInfo } from '@src/pages/ActivityManagement/ActivityInfo';
import { SwitchWithDefault, LoadingWrapper } from '@sber-universe/om-component-library';

export const ActivityManagement = (): JSX.Element => {
  const { planId } = useParams<EduPlanParams>();
  const status = useStore($getEduProgramId);
  useEffect(() => {
    getEduProgramId(planId);
    return resetDomainData;
  }, [planId]);
  return (
    <LoadingWrapper errorStatusList={[status]} loadingStatusList={[status]}>
      <SwitchWithDefault>
        <Route exact path={getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_CREATE)} component={CreateActivity} />
        <Route exact path={getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_GROUP_CREATE)} component={CreateActivityGroup} />
        <Route exact path={getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_EDIT)} component={UpdateActivity} />
        <Route exact path={getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_GROUP_EDIT)} component={UpdateActivityGroup} />
        <Route path={getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_INFO_ROOT)} component={ActivityInfo} />
      </SwitchWithDefault>
    </LoadingWrapper>
  );
};
