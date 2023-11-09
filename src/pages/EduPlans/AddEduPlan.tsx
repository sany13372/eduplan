import React, { useEffect, useMemo } from 'react';
import {
  $createEduPlanInfo,
  $getCreateEduPlanInfoStatus,
  $createdId,
  createEduPlan,
  getCreateEduPlanInfo,
  resetCreateEduPlanInfo,
  $createEduPlanValidationErrors,
  resetCreateEduPlanValidationErrors,
} from '@src/pages/EduPlans/model';
import { useHistory, useParams } from 'react-router-dom';
import { AddEduPlanInfo } from '@src/pages/EduPlans/model/types';
import { addEduPlanSchema } from '@src/pages/EduPlans/model/validation';
import { ExternalRoutes, getExtenalPath, getPath, MfeRoutes } from '@constants/routes';
import { $prevIsExternal, resetNavigationInfo, setNavigationInfo } from '@src/app/model';
import { CommonForm } from '@src/pages/EduPlans/components';
import './model/init';
import { useStore } from 'effector-react';

export const AddEduPlan = (): JSX.Element => {
  const { programId } = useParams<{ programId: string }>();
  const goToEduProgramms = useStore($prevIsExternal);

  const prevPath: string = useMemo(
    () =>
      goToEduProgramms
        ? getExtenalPath(ExternalRoutes.EDU_PLAN, { ':id': programId })
        : getPath(MfeRoutes.EDU_PLAN_LIST, { ':id': programId }),
    [goToEduProgramms, programId],
  );

  const history = useHistory();

  const successHandler = (planId: string) => {
    history.push(getPath(MfeRoutes.EDU_PLAN_INFO_VIEW, { ':id': programId, ':planId': planId }));
  };

  const submitHandler = (values: AddEduPlanInfo) => {
    createEduPlan(values);
  };

  const resetHandler = () => {
    history.push(prevPath);
  };

  useEffect(() => {
    setNavigationInfo({ label: 'К списку планов обучения', to: prevPath });
    return resetNavigationInfo;
  }, [prevPath]);

  useEffect(() => {
    getCreateEduPlanInfo(programId);
    return resetCreateEduPlanInfo;
  }, [programId]);

  return (
    <CommonForm<AddEduPlanInfo>
      title="Добавление плана обучения"
      initDataStore={$createEduPlanInfo}
      savedItemIdStore={$createdId}
      initDataStatusStore={$getCreateEduPlanInfoStatus}
      validationSchema={addEduPlanSchema}
      onSubmit={submitHandler}
      onReset={resetHandler}
      onSuccess={successHandler}
      errorStore={$createEduPlanValidationErrors}
      dismissErrorStore={resetCreateEduPlanValidationErrors}
    />
  );
};
