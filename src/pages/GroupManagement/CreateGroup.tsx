import React, { useCallback, useEffect } from 'react';
import '@src/pages/ActivityManagement/model/init';
import { useHistory, useParams } from 'react-router-dom';
import { EduPlanParams, getPath, MfeRoutes } from '@constants/routes';
import { resetNavigationInfo, setNavigationInfo } from '@src/app/model';
import { addGroup, createGroupInitialData, groupTypesStore, resetDomain } from '@src/pages/GroupManagement/model';
import { GroupForm } from '@src/pages/GroupManagement/components';
import { GroupFormContent } from '@src/pages/GroupManagement/components/GroupForm/GroupFormContent';
import { useStore } from 'effector-react';
import { LoadingWrapper } from '@sber-universe/om-component-library';

import './model/init';

export const CreateGroup = (): JSX.Element => {
  const { planId } = useParams<EduPlanParams>();
  const groupTypes = useStore(groupTypesStore.$items);
  const groupTypesLoading = useStore(groupTypesStore.$loading);
  const history = useHistory();

  const { add, $validationErrors, $createdId, resetErrors } = addGroup;
  const createdId = useStore($createdId);

  useEffect(() => resetDomain, []);

  useEffect(() => {
    groupTypesStore.get(planId);
    createGroupInitialData.get(planId);
  }, [planId]);

  const prevPath: string = getPath(MfeRoutes.EDU_PLAN_INFO_GROUP_LIST, { ':planId': planId });
  const successPath: string = getPath(MfeRoutes.EDU_PLAN_INFO_GROUP_VIEW, { ':planId': planId, ':groupId': createdId });
  const initDataStatus = useStore(createGroupInitialData.$status);
  const initData = useStore(createGroupInitialData.$value);

  const goBack = useCallback(() => {
    history.push(prevPath);
  }, [history, prevPath]);

  const onSuccess = useCallback(() => {
    history.push(successPath);
  }, [history, successPath]);

  useEffect(() => {
    setNavigationInfo({ label: 'К списку учебных групп', to: prevPath });
    return resetNavigationInfo;
  }, [prevPath]);

  return (
    <LoadingWrapper loadingStatusList={[initDataStatus]} errorStatusList={[initDataStatus]}>
      <GroupForm
        onSuccess={onSuccess}
        initData={initData}
        onSubmit={add}
        errorStore={$validationErrors}
        resetErrorStore={resetErrors}
        savedItemIdStore={$createdId}
        title="Добавление учебной группы"
      >
        <GroupFormContent groupTypes={groupTypes} groupTypesChangeAvailable={!groupTypesLoading} onReset={goBack} />
      </GroupForm>
    </LoadingWrapper>
  );
};
