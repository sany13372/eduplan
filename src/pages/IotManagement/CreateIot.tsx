import React, { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getPath, IotParams, MfeRoutes } from '@constants/routes';
import { resetNavigationInfo, setNavigationInfo } from '@src/app/model';
import { useStore } from 'effector-react';
import { IotForm, IotFormContent } from '@src/pages/IotManagement/components';
import { addIot, iotTemplates, resetDomain, studentTrajectoryMap } from '@src/pages/IotManagement/model';
import { AddIotData } from '@src/pages/IotManagement/model/types';

import './model/init';

export const CreateIot = (): JSX.Element => {
  const { planId, gridElementId } = useParams<IotParams>();
  const { data: userList } = useStore(studentTrajectoryMap.$value);
  const history = useHistory();

  const { add, $validationErrors, $createdId, resetErrors, $status } = addIot;
  const status = useStore($status);
  const getTemplatesStatus = useStore(iotTemplates.$status);
  const templatesList = useStore(iotTemplates.$value);
  useEffect(() => resetDomain, []);

  useEffect(() => {
    iotTemplates.get({ planId, gridElementId });
  }, [gridElementId, planId]);

  const prevPath: string = getPath(MfeRoutes.EDU_PLAN_INFO_IOT, { ':planId': planId });
  const initData: AddIotData = {
    studentIdList: userList.filter((e) => e.isSelected[gridElementId]).map((e) => e.studentInfo.id),
  };

  const goBack = useCallback(() => {
    history.push(prevPath);
  }, [history, prevPath]);

  const onSuccess = useCallback(() => {
    history.push(prevPath);
  }, [history, prevPath]);

  useEffect(() => {
    setNavigationInfo({ label: 'К списку ИОТ обучающихся', to: prevPath });
    return resetNavigationInfo;
  }, [prevPath]);

  return (
    <IotForm
      onSuccess={onSuccess}
      initData={initData}
      onSubmit={add}
      errorStore={$validationErrors}
      resetErrorStore={resetErrors}
      savedItemIdStore={$createdId}
      title="Добавление индивидуальной образовательной траектории обучающегося"
    >
      <IotFormContent
        templates={templatesList}
        selectTemplateAvailable={getTemplatesStatus !== 'pending'}
        onReset={goBack}
        isSubmitting={status === 'pending'}
      />
    </IotForm>
  );
};
