import React, { useEffect } from 'react';
import { UpdateGroupInfo } from '@src/pages/StudentGroupList/model/types';
import {
  updateGroup,
  updateGroupInitialData,
  $groupStudentModalName,
  groupStudentModalApi,
} from '@src/pages/StudentGroupList/model';
import { ErrorMessage } from '@src/components';
import { useStore } from 'effector-react';
import { LoadingWrapper } from '@sber-universe/om-component-library';

import { GroupFormContent } from './GroupForm/GroupFormContent';
import { GroupForm } from './GroupForm/GroupForm';

export const UpdateGroup = (): JSX.Element => {
  const groupModalName = useStore($groupStudentModalName).id;
  const { update, $validationErrors, $updatedId, resetErrors } = updateGroup;
  const initDataStatus = useStore(updateGroupInitialData.$status);
  const initData = useStore(updateGroupInitialData.$value);

  useEffect(() => {
    updateGroupInitialData.get(groupModalName || '');
  }, [groupModalName]);

  if (initDataStatus === 'fail') return <ErrorMessage message="Не удалось получить информацию о учебной группе" />;

  return (
    <LoadingWrapper loadingStatusList={[initDataStatus]} errorStatusList={[initDataStatus]}>
      <GroupForm<UpdateGroupInfo>
        onSuccess={() => {
          groupStudentModalApi.close()
          updateGroup.reset()
        }}
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
          onReset={() => groupStudentModalApi.close()}
        />
      </GroupForm>
    </LoadingWrapper>
  );
};
