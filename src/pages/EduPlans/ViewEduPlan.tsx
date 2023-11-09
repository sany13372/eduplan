import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { EduPlanParams } from '@src/types/types';
import {
  $eduPlanInfo,
  $eduPlanNotFound,
  $getEduPlanInfoStatus,
  getEduPlanInfo,
  resetEduPlanInfo,
} from '@src/pages/EduPlans/model';
import { useStore } from 'effector-react';
import { ErrorMessage } from '@src/components';
import { LoadingOverlay } from '@sber-universe/om-component-library';
import { ExternalRoutes, getExtenalPath, getPath, MfeRoutes } from '@constants/routes';
import { $prevIsExternal, resetNavigationInfo, setNavigationInfo } from '@src/app/model';
import { ActivityList } from '@src/pages/ActivityList';
import { useMfeBackGround } from '@utils/hooks';
import { HeaderInfo, InfoPanel } from '@src/pages/EduPlans/components';
import { AdminsManagementDrawer } from '@src/pages/EduPlans/components/AdminsManagementDrawer';
import { PORTAL_ID } from '@constants/portal';

export const ViewEduPlan = (): JSX.Element => {
  const { planId } = useParams<EduPlanParams>();

  const eduPlan = useStore($eduPlanInfo);
  const isNotFound = useStore($eduPlanNotFound);
  const status = useStore($getEduPlanInfoStatus);

  useMfeBackGround('gray');

  useEffect(() => {
    if (planId) getEduPlanInfo(planId);
    return resetEduPlanInfo;
  }, [planId]);

  const goToEduProgramms = useStore($prevIsExternal);

  const prevPath: string = useMemo(
    () =>
      goToEduProgramms && eduPlan
        ? getExtenalPath(ExternalRoutes.EDU_PLAN, { ':id': eduPlan.eduProgramInfo.id })
        : getPath(MfeRoutes.EDU_PLAN_LIST),
    [goToEduProgramms, eduPlan],
  );
  useEffect(() => {
    setNavigationInfo({ label: 'К списку планов обучения', to: prevPath });
    return resetNavigationInfo;
  }, [prevPath]);

  if (status === 'pending') return <LoadingOverlay loading />;
  if (status === 'fail') return <ErrorMessage />;

  if (isNotFound) return <ErrorMessage message="План обучения не найден" />;
  return (
    <>
      {eduPlan && (
        <>
          <HeaderInfo title={eduPlan.title} id={eduPlan.id} eduProgId={eduPlan.eduProgramInfo.id} />
          <AdminsManagementDrawer planId={planId} portalId={PORTAL_ID} />
          <div className="flex flex-col space-y-8">
            <InfoPanel data={eduPlan} />
            <div>
              <ActivityList
                eduGridId={eduPlan.eduGrid.id as string}
                eduProgId={eduPlan.eduProgramInfo.id}
                eduPlanId={planId}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
