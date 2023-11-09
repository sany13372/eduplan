import { useHistory, useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { activityStore, addIotTemplate, resetDomain } from '@src/pages/IotTemplateManagement/model';
import React, { useCallback, useEffect } from 'react';
import { getPath, IotParams, MfeRoutes } from '@constants/routes';
import { resetNavigationInfo, setNavigationInfo } from '@src/app/model';
import { IotTemplate } from '@src/pages/IotTemplateManagement/model/types';
import { LoadingWrapper } from '@sber-universe/om-component-library';
import { useMfeBackGround } from '@utils/hooks';

import { IotTemplateForm } from './components';

export const CreateIotTemplate = (): JSX.Element => {
  const { planId, gridElementId } = useParams<IotParams>();
  const history = useHistory();
  const activitiListStatus = useStore(activityStore.$status);

  useEffect(() => {
    activityStore.get({ planId, eduGridElementId: gridElementId });
  }, [gridElementId, planId]);

  const { add, $validationErrors, $createdId, $status, resetErrors } = addIotTemplate;

  useEffect(() => resetDomain, []);

  const prevPath: string = getPath(MfeRoutes.EDU_PLAN_INFO_IOT_TEMPLATE, { ':planId': planId });
  const initData: IotTemplate = {
    id: '',
    title: '',
    planId,
    spaceId: '',
    eduGridElementId: gridElementId,
    rows: [],
  };

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
    <LoadingWrapper loadingStatusList={[activitiListStatus]} errorStatusList={[activitiListStatus]}>
      <IotTemplateForm
        onSuccess={onSuccess}
        initData={initData}
        onSubmit={(values: IotTemplate) => {
          add(values);
        }}
        statusStore={$status}
        onReset={goBack}
        errorStore={$validationErrors}
        resetErrorStore={resetErrors}
        savedItemIdStore={$createdId}
        title="Создание шаблона индивидуальной образовательной траектории"
      />
    </LoadingWrapper>
  );
};
