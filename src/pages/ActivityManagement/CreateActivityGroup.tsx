import React, { useCallback, useEffect } from 'react';
import '@src/pages/ActivityManagement/model/init';
import { ShortActivityGroupInfo } from '@src/pages/ActivityManagement/model/types';
import { useHistory, useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import {
  $componentKindList,
  $createActivityGroupStatus,
  $createdGroupId,
  $createGroupActivityErrors,
  $eduProgramId,
  $getComponentKindListStatus,
  createGroupActivity,
  getComponentKindList,
  resetCreateGroupActivityErrors,
  resetCreateGroupActivityInfo,
} from '@src/pages/ActivityManagement/model';
import { getPath, MfeRoutes } from '@constants/routes';
import { resetNavigationInfo, setNavigationInfo } from '@src/app/model';
import {
  ActivityGroupForm,
  ActivityGroupFormContent,
} from '@src/pages/ActivityManagement/components/ActivityGroupForm';

export const CreateActivityGroup = (): JSX.Element => {
  const eduProgramId = useStore($eduProgramId);
  const { planId, gridElementId } = useParams<{ planId: string; gridElementId: string }>();
  const history = useHistory();
  const initData: ShortActivityGroupInfo = {
    id: undefined,
    title: '',
    shortTitle: '',
    component: undefined,
    eduGridElementId: gridElementId,
    eduPlanId: planId,
  };

  useEffect(() => {
    getComponentKindList(eduProgramId);
  }, [eduProgramId]);

  const componentKindList = useStore($componentKindList);
  const getComponentKindListStatus = useStore($getComponentKindListStatus);
  const prevPath: string = getPath(MfeRoutes.EDU_PLAN_INFO_VIEW, { ':planId': planId });

  const goBack = useCallback(() => {
    history.push(prevPath);
  }, [history, prevPath]);

  useEffect(() => {
    setNavigationInfo({ label: 'К списку мероприятий планов обучения', to: prevPath });
    return resetNavigationInfo;
  }, [prevPath]);

  useEffect(() => resetCreateGroupActivityInfo, []);

  return (
    <ActivityGroupForm
      savedItemIdStore={$createdGroupId}
      resetErrorStore={resetCreateGroupActivityErrors}
      errorStore={$createGroupActivityErrors}
      onSubmit={createGroupActivity}
      initData={initData}
      onSuccess={goBack}
      title="Добавление группы мероприятий"
    >
      <ActivityGroupFormContent
        onReset={goBack}
        componentKindList={componentKindList}
        componentKindListChangeAvailable={getComponentKindListStatus === 'done'}
        statusStore={$createActivityGroupStatus}
      />
    </ActivityGroupForm>
  );
};
