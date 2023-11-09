import { LoadingOverlay } from '@sber-universe/om-component-library';
import React, { useCallback, useEffect } from 'react';
import { ErrorMessage } from '@src/components';
import '@src/pages/ActivityManagement/model/init';
import { useHistory, useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import {
  $getUpdatedGroupItemStatus,
  $updatedGroupId,
  $updatedGroupItem,
  $updatedGroupItemNotFound,
  $updateGroupActivityErrors,
  $updateGroupActivityStatus,
  getUpdatedGroupItem,
  resetUpdateGroupActivityErrors,
  resetUpdateGroupActivityInfo,
  updateGroupActivity,
} from '@src/pages/ActivityManagement/model';
import { getPath, MfeRoutes } from '@constants/routes';
import { resetNavigationInfo, setNavigationInfo } from '@src/app/model';
import {
  ActivityGroupForm,
  ActivityGroupFormContent,
} from '@src/pages/ActivityManagement/components/ActivityGroupForm';

export const UpdateActivityGroup = (): JSX.Element => {
  const { planId, groupId } = useParams<{ id: string; planId: string; groupId: string }>();
  const history = useHistory();
  const initData = useStore($updatedGroupItem);

  const getInitdataStatus = useStore($getUpdatedGroupItemStatus);
  const initDataNotFound = useStore($updatedGroupItemNotFound);

  useEffect(() => {
    getUpdatedGroupItem(groupId);
  }, [groupId]);

  useEffect(() => resetUpdateGroupActivityInfo, []);

  const prevPath: string = getPath(MfeRoutes.EDU_PLAN_INFO_VIEW, { ':planId': planId });

  const goBack = useCallback(() => {
    history.push(prevPath);
  }, [history, prevPath]);

  useEffect(() => {
    setNavigationInfo({ label: 'К списку мероприятий плана обучения', to: prevPath });
    return resetNavigationInfo;
  }, [prevPath]);

  if (getInitdataStatus === 'pending') return <LoadingOverlay loading />;
  if (initDataNotFound) return <ErrorMessage message="Элемент не найден" />;
  if (getInitdataStatus === 'fail' || !initData) return <ErrorMessage />;

  return (
    <ActivityGroupForm
      onSuccess={goBack}
      initData={initData}
      onSubmit={updateGroupActivity}
      errorStore={$updateGroupActivityErrors}
      resetErrorStore={resetUpdateGroupActivityErrors}
      savedItemIdStore={$updatedGroupId}
      title="Редактирование группы мероприятий"
    >
      <ActivityGroupFormContent
        componentKindList={[]}
        componentKindListChangeAvailable={false}
        onReset={goBack}
        statusStore={$updateGroupActivityStatus}
      />
    </ActivityGroupForm>
  );
};
