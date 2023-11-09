import React, { useEffect } from 'react';
import {
  $getUpdateEduPlanInfoStatus,
  $updatedId,
  $updateEduPlanInfo,
  $updateEduPlanInfoNotFound,
  $updateEduPlanValidationErrors,
  getUpdateEduPlanInfo,
  resetUpdateEduPlanInfo,
  resetUpdateEduPlanValidationErrors,
  updateEduPlan,
} from '@src/pages/EduPlans/model';
import { useHistory, useParams } from 'react-router-dom';
import { EduPlanParams } from '@src/types/types';
import { EduPlanInfo } from '@src/pages/EduPlans/model/types';
import { updateEduPlanSchema } from '@src/pages/EduPlans/model/validation';
import { getPath, MfeRoutes } from '@constants/routes';
import { resetNavigationInfo, setNavigationInfo } from '@src/app/model';
import { CommonForm } from '@src/pages/EduPlans/components';
import { useStore } from 'effector-react';

export const UpdateEduPlan = (): JSX.Element => {
  const history = useHistory();
  const { planId } = useParams<EduPlanParams>();
  const isNotFound = useStore($updateEduPlanInfoNotFound);
  const prevPath: string = getPath(MfeRoutes.EDU_PLAN_INFO_VIEW, { ':planId': planId });

  const successHandler = () => {
    history.push(prevPath);
  };

  const submitHandler = (values: EduPlanInfo) => {
    updateEduPlan(values);
  };

  const resetHandler = () => {
    history.push(prevPath);
  };

  useEffect(() => {
    setNavigationInfo({ label: 'К карточке плана обучения', to: prevPath });
    return resetNavigationInfo;
  }, [prevPath]);

  useEffect(() => {
    if (planId) getUpdateEduPlanInfo(planId);
    return resetUpdateEduPlanInfo;
  }, [planId]);

  return (
    <CommonForm<EduPlanInfo>
      title="Редактирование плана обучения"
      initDataStore={$updateEduPlanInfo}
      savedItemIdStore={$updatedId}
      initDataStatusStore={$getUpdateEduPlanInfoStatus}
      validationSchema={updateEduPlanSchema}
      onSubmit={submitHandler}
      onReset={resetHandler}
      onSuccess={successHandler}
      errorStore={$updateEduPlanValidationErrors}
      dismissErrorStore={resetUpdateEduPlanValidationErrors}
      notFoundError={isNotFound ? 'План обучения не найден' : ''}
    />
  );
};
