/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import { EduPlanParams, getPath, MfeRoutes } from '@constants/routes';
import { ViewEduPlan } from '@src/pages/EduPlans/ViewEduPlan';
import { NavigationTabs } from '@src/pages/EduPlans/components';
import { IotTemplateList } from '@src/pages/IotTemplateList';
import { IotList } from '@src/pages/IotManagement';
import { EventList } from '@src/pages/Events';
import { LoadingWrapper, SwitchWithDefault } from '@sber-universe/om-component-library';
import { Teachers } from '@src/pages/Teachers';
import { DescManagement } from '@src/pages/Desc';
import { StudentGroupList } from '@src/pages/StudentGroupList';
import { $mfeBackground } from '@src/app/model';
import { useStore } from 'effector-react';
import { isAvailableData, resetDomainData } from '@src/pages/EduPlans/model';

export const EduPlansManagement: FC = (): React.ReactElement => {
  const backgroundValue = useStore($mfeBackground);
  const { planId } = useParams<EduPlanParams>();
  useEffect(() => {
    isAvailableData.get(planId);
    return resetDomainData;
  }, []);
  const isAvailableStatus = useStore(isAvailableData.$status);
  return (
    <LoadingWrapper
      loadingStatusList={[isAvailableStatus]}
      errorStatusList={[isAvailableStatus]}
      errorInfoProps={{ subTitle: 'План обучения не найден' }}
    >
      <div className="space-y-8">
        <NavigationTabs isDark={backgroundValue === 'gray'} />
        <SwitchWithDefault>
          <Route exact path={getPath(MfeRoutes.EDU_PLAN_INFO_VIEW)} component={ViewEduPlan} />
          <Route exact path={getPath(MfeRoutes.EDU_PLAN_INFO_STUDENT_GROUP_LIST)} component={StudentGroupList} />
          <Route exact path={getPath(MfeRoutes.EDU_PLAN_INFO_IOT_TEMPLATE)} component={IotTemplateList} />
          <Route exact path={getPath(MfeRoutes.EDU_PLAN_INFO_IOT)} component={IotList} />
          <Route exact path={getPath(MfeRoutes.EDU_PLAN_TEACHERS)} component={Teachers} />
          <Route path={getPath(MfeRoutes.EDU_PLAN_DESC_ROOT)} component={DescManagement} />
          <Route exact path={getPath(MfeRoutes.EDU_PLAN_EVENTS)} render={() => <EventList eduplanId={planId} />} />
        </SwitchWithDefault>
      </div>
    </LoadingWrapper>
  );
};
