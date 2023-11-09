import React, { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { EduPlanParams, getPath, MfeRoutes } from '@constants/routes';
import {
  addGroup,
  createGroupInitialData,
  groupStudentModalApi,
  groupTypesStore,
} from '@src/pages/StudentGroupList/model';
import { GroupForm, GroupFormContent } from '@src/pages/StudentGroupList/components';
import { useStore } from 'effector-react';
import { LoadingWrapper } from '@sber-universe/om-component-library';

export const CreateGroup = (): JSX.Element => {
  const { planId } = useParams<EduPlanParams>();
  const groupTypes = useStore(groupTypesStore.$items);
  const groupTypesLoading = useStore(groupTypesStore.$loading);
  const { add, $validationErrors, $createdId, resetErrors } = addGroup;

  useEffect(() => {
    groupTypesStore.get(planId);
    createGroupInitialData.get(planId);
  }, [planId]);

  const initDataStatus = useStore(createGroupInitialData.$status);
  const initData = useStore(createGroupInitialData.$value);

  const closeModal = () => groupStudentModalApi.close();

  return (
    <LoadingWrapper loadingStatusList={[initDataStatus]} errorStatusList={[initDataStatus]}>
      <GroupForm
        onSuccess={closeModal}
        initData={initData}
        onSubmit={add}
        errorStore={$validationErrors}
        resetErrorStore={resetErrors}
        savedItemIdStore={$createdId}
        title="Добавление группы"
      >
        <GroupFormContent groupTypes={groupTypes} groupTypesChangeAvailable={!groupTypesLoading} onReset={closeModal} />
      </GroupForm>
    </LoadingWrapper>
  );
};
