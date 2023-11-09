import React, { useEffect } from 'react';
import { ErrorMessage } from '@src/components';
import { useStore } from 'effector-react';
import { LoadingWrapper } from '@sber-universe/om-component-library';
import {
  updateGroup,
  updateGroupInitialData,
  $groupManagementModalName,
  groupManagementModalApi,
} from '@src/pages/GroupManagement/model';
import { UpdateGroupInfo } from '@src/pages/GroupManagement/model/types';

import { GroupFormContent } from './GroupForm/GroupFormContent';
import { GroupForm } from './GroupForm/GroupForm';

export const UpdateGroup = (): JSX.Element => {
  const groupModalName = useStore($groupManagementModalName).id;
  const initDataStatus = useStore(updateGroupInitialData.$status);
  const initData = useStore(updateGroupInitialData.$value);
  const { update, $validationErrors, $updatedId, resetErrors } = updateGroup;

  useEffect(() => {
    updateGroupInitialData.get(groupModalName || '');
  }, [groupModalName]);

  if (initDataStatus === 'fail') return <ErrorMessage message="Не удалось получить информацию о учебной группе" />;

  return (
    <LoadingWrapper loadingStatusList={[initDataStatus]} errorStatusList={[initDataStatus]}>
      <GroupForm<UpdateGroupInfo>
        onSuccess={() => groupManagementModalApi.close()}
        initData={initData as UpdateGroupInfo}
        onSubmit={update}
        errorStore={$validationErrors}
        resetErrorStore={resetErrors}
        savedItemIdStore={$updatedId}
        title="Редактирование группы"
      >
        <GroupFormContent
          groupTypes={[]}
          groupTypesChangeAvailable={false}
          onReset={() => groupManagementModalApi.close()}
        />
      </GroupForm>
    </LoadingWrapper>
  );
};
