import { useParams } from 'react-router-dom';
import { EduPlanActivityParams, getPath, MfeRoutes } from '@constants/routes';
import { useEffect } from 'react';
import { resetNavigationInfo, setNavigationInfo } from '@src/app/model';

export const usePlanCardNavInfo = () => {
  const { planId } = useParams<EduPlanActivityParams>();
  const prevPath: string = getPath(MfeRoutes.EDU_PLAN_INFO_VIEW, { ':planId': planId });

  useEffect(() => {
    setNavigationInfo({ label: 'К карточке плана обучения', to: prevPath });
    return resetNavigationInfo;
  }, [prevPath]);
};
