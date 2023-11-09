import { LoadingOverlay } from '@sber-universe/om-component-library';
import React, { useCallback, useEffect } from 'react';
import { ErrorMessage } from '@src/components';
import '@src/pages/ActivityManagement/model/init';
import { useHistory, useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import {
  $getUpdatedItemStatus,
  $updateActivityErrors,
  $updateActivityStatus,
  $updatedId,
  $updatedItem,
  $updatedItemNotFound,
  getUpdatedItem,
  resetUpdateActivityErrors,
  resetUpdateActivityInfo,
  updateActivity,
} from '@src/pages/ActivityManagement/model';
import { getPath, MfeRoutes } from '@constants/routes';
import { resetNavigationInfo, setNavigationInfo } from '@src/app/model';
import { ActivityForm, ActivityFormContent } from '@src/pages/ActivityManagement/components';

export const UpdateActivity = (): JSX.Element => {
  const { planId, activityId } = useParams<{
    id: string;
    planId: string;
    groupId?: string;
    gridElementId: string;
    activityId: string;
  }>();
  const history = useHistory();
  const initData = useStore($updatedItem);

  const getInitdataStatus = useStore($getUpdatedItemStatus);
  const initDataNotFound = useStore($updatedItemNotFound);

  useEffect(() => {
    getUpdatedItem(activityId);
  }, [activityId]);

  useEffect(() => resetUpdateActivityInfo, []);

  const prevPath: string = getPath(MfeRoutes.EDU_PLAN_INFO_VIEW, { ':planId': planId });

  useEffect(() => {
    setNavigationInfo({ label: 'К списку мероприятий плана обучения', to: prevPath });
    return resetNavigationInfo;
  }, [prevPath]);

  const goBack = useCallback(() => {
    history.push(prevPath);
  }, [history, prevPath]);

  if (getInitdataStatus === 'pending') return <LoadingOverlay loading />;
  if (initDataNotFound) return <ErrorMessage message="Элемент не найден" />;
  if (getInitdataStatus === 'fail' || !initData) return <ErrorMessage />;

  return (
    <ActivityForm
      onSuccess={goBack}
      initData={initData}
      onSubmit={updateActivity}
      errorStore={$updateActivityErrors}
      resetErrorStore={resetUpdateActivityErrors}
      savedItemIdStore={$updatedId}
      title="Редактирование учебного мероприятия"
    >
      <ActivityFormContent
        categoryList={[]}
        categoryChangeAvailable={false}
        onReset={goBack}
        statusStore={$updateActivityStatus}
      />
    </ActivityForm>
  );
};
