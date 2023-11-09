import { useHistory, useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import {
  activityStore,
  resetDomain,
  updateIotTemplate,
  updateIotTemplateInitialData,
} from '@src/pages/IotTemplateManagement/model';
import React, { useCallback, useEffect } from 'react';
import { getPath, IotUpdateParams, MfeRoutes } from '@constants/routes';
import { resetNavigationInfo, setNavigationInfo } from '@src/app/model';
import { IotTemplate } from '@src/pages/IotTemplateManagement/model/types';
import { LoadingWrapper } from '@sber-universe/om-component-library';
import { useMfeBackGround } from '@utils/hooks';

import { IotTemplateForm } from './components';

export const UpdateIotTemplate = (): JSX.Element => {
  const { planId, gridElementId, iotTemplateId } = useParams<IotUpdateParams>();
  const history = useHistory();
  const activitiListStatus = useStore(activityStore.$status);
  const initDataStatus = useStore(updateIotTemplateInitialData.$status);
  const initData = useStore(updateIotTemplateInitialData.$value);

  useEffect(() => {
    activityStore.get({ planId, eduGridElementId: gridElementId });
  }, [gridElementId, planId]);

  useEffect(() => {
    updateIotTemplateInitialData.get(iotTemplateId);
  }, [iotTemplateId]);

  const { update, $validationErrors, $updatedId, $status, resetErrors } = updateIotTemplate;

  useEffect(() => resetDomain, []);

  const prevPath: string = getPath(MfeRoutes.EDU_PLAN_INFO_IOT_TEMPLATE, { ':planId': planId });

  const goBack = useCallback(() => {
    history.push(prevPath);
  }, [history, prevPath]);

  const onSuccess = useCallback(() => {
    history.push(prevPath);
  }, [history, prevPath]);

  useEffect(() => {
    setNavigationInfo({ label: 'К списку шаблонов ИОТ', to: prevPath });
    return resetNavigationInfo;
  }, [prevPath]);
  useMfeBackGround('gray');

  return (
    <LoadingWrapper
      loadingStatusList={[activitiListStatus, initDataStatus]}
      errorStatusList={[activitiListStatus, initDataStatus]}
    >
      <IotTemplateForm
        onSuccess={onSuccess}
        initData={initData as IotTemplate}
        onSubmit={(values: IotTemplate) => {
          update(values);
        }}
        statusStore={$status}
        onReset={goBack}
        errorStore={$validationErrors}
        resetErrorStore={resetErrors}
        savedItemIdStore={$updatedId}
        title="Редактирование шаблона индивидуальной образовательной траектории"
      />
    </LoadingWrapper>
  );
};
