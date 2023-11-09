import React, { useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import { ViewActivity } from '@src/pages/ActivityManagement/ViewActivity';
import { Header, NavigationTabs } from '@src/pages/ActivityManagement/components';
import { LessonsInfo } from '@src/pages/ActivityManagement/LessonsInfo';
import { LoadingWrapper, SwitchWithDefault } from '@sber-universe/om-component-library';
import { useStore } from 'effector-react';
import { activityInfo, resetDomainData } from '@src/pages/ActivityManagement/model';
import { LessonSettings } from '@src/pages/ActivityManagement/LessonSettings';
import { MfeBackground } from '@src/app/model/types';
import { RenderTitle } from '@src/pages/ActivityManagement/components/Header';
import { SaveLessonDrawer } from '@src/pages/Lessons';
import { EduPlanActivityParams, MfeRoutes, getPath } from '@src/constants/routes';

export interface ActivityInfoDefaultProps {
  background: MfeBackground;
  canEdit: boolean;
  renderTitle: RenderTitle;
}

export const ActivityInfoDefault = ({ background, canEdit, renderTitle }: ActivityInfoDefaultProps): JSX.Element => {
  const { activityId, planId } = useParams<EduPlanActivityParams>();
  const activityData = useStore(activityInfo.$value);
  const status = useStore(activityInfo.$status);

  useEffect(() => resetDomainData, []);

  useEffect(() => {
    activityInfo.get(activityId);
  }, [activityId]);

  return (
    <>
      <SaveLessonDrawer />
      <LoadingWrapper errorStatusList={[status]} loadingStatusList={[status]}>
        {activityData && (
          <Header activityData={activityData} planId={planId} canEdit={canEdit} renderTitle={renderTitle} />
        )}
        <div className="space-y-8">
          <NavigationTabs isDark={background === 'gray'} />

          <SwitchWithDefault>
            <Route exact path={getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_VIEW)} component={ViewActivity} />
            <Route exact path={getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_LESSON_INFO)} component={LessonsInfo} />
            <Route exact path={getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_SETTINGS_INFO)} component={LessonSettings} />
            <Route exact path="" component={ViewActivity} />
          </SwitchWithDefault>
        </div>
      </LoadingWrapper>
    </>
  );
};
