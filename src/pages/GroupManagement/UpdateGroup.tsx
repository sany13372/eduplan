import React, { useCallback, useEffect } from 'react';
import '@src/pages/ActivityManagement/model/init';
import { useHistory, useParams } from 'react-router-dom';
import { getPath, MfeRoutes } from '@constants/routes';
import { resetNavigationInfo, setNavigationInfo } from '@src/app/model';
import { UpdateGroupInfo } from '@src/pages/GroupManagement/model/types';
import { resetDomain, updateGroup, updateGroupInitialData } from '@src/pages/GroupManagement/model';
import { GroupForm } from '@src/pages/GroupManagement/components';
import { ErrorMessage } from '@src/components';
import { GroupFormContent } from '@src/pages/GroupManagement/components/GroupForm/GroupFormContent';
import { useStore } from 'effector-react';
import './model/init';
import { LoadingWrapper } from '@sber-universe/om-component-library';

export const UpdateGroup = (): JSX.Element => {
  const { planId, groupId } = useParams<{ planId: string; groupId: string }>();
  const history = useHistory();

  const { update, $validationErrors, $updatedId, resetErrors } = updateGroup;
  const updatedId = useStore($updatedId);

  useEffect(() => resetDomain, []);

  useEffect(() => {
    updateGroupInitialData.get(groupId);
  }, [groupId]);

  const prevPath: string = getPath(MfeRoutes.EDU_PLAN_INFO_GROUP_LIST, { ':planId': planId });
  const successPath: string = getPath(MfeRoutes.EDU_PLAN_INFO_GROUP_VIEW, { ':planId': planId, ':groupId': updatedId });

  const initDataStatus = useStore(updateGroupInitialData.$status);
  const initData = useStore(updateGroupInitialData.$value);

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
  if (initDataStatus === 'fail') return <ErrorMessage message="Не удалось получить информацию о учебной группе" />;

  return (
    <LoadingWrapper loadingStatusList={[initDataStatus]} errorStatusList={[initDataStatus]}>
      <GroupForm<UpdateGroupInfo>
        onSuccess={onSuccess}
        initData={initData as UpdateGroupInfo}
        onSubmit={update}
        errorStore={$validationErrors}
        resetErrorStore={resetErrors}
        savedItemIdStore={$updatedId}
        title="Редактирование учебной группы"
      >
        <GroupFormContent groupTypes={[]} groupTypesChangeAvailable={false} onReset={goBack} />
      </GroupForm>
    </LoadingWrapper>
  );
};
