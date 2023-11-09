import React, { useCallback, useEffect } from 'react';
import '@src/pages/ActivityManagement/model/init';
import { ShortActivityInfo } from '@src/pages/ActivityManagement/model/types';
import { useHistory, useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import {
  $categoryList,
  $createActivityErrors,
  $createActivityStatus,
  $createdId,
  $eduProgramId,
  $getCategoryListStatus,
  createActivity,
  getCategoryList,
  resetCreateActivityErrors,
  resetCreateActivityInfo,
} from '@src/pages/ActivityManagement/model';
import { getPath, MfeRoutes } from '@constants/routes';
import { resetNavigationInfo, setNavigationInfo } from '@src/app/model';
import { ActivityForm, ActivityFormContent } from '@src/pages/ActivityManagement/components';
import { useSearchParam } from '@utils/hooks';

export const CreateActivity = (): JSX.Element => {
  const eduProgramId = useStore($eduProgramId);
  const { gridElementId, planId } = useParams<{ planId: string; groupId?: string; gridElementId: string }>();
  const groupId = useSearchParam('groupId');
  const history = useHistory();
  const initData: ShortActivityInfo = {
    title: '',
    shortTitle: '',
    eduGridElementId: gridElementId ?? '',
    eduPlanId: planId,
    path: groupId ?? null,
  };

  useEffect(() => resetCreateActivityInfo, []);

  useEffect(() => {
    getCategoryList(eduProgramId);
  }, [eduProgramId]);

  const categoryList = useStore($categoryList);
  const getCategoryListStatus = useStore($getCategoryListStatus);

  const prevPath: string = getPath(MfeRoutes.EDU_PLAN_INFO_VIEW, { ':planId': planId });

  const goBack = useCallback(() => {
    history.push(prevPath);
  }, [history, prevPath]);

  useEffect(() => {
    setNavigationInfo({ label: 'К списку мероприятий планов обучения', to: prevPath });
    return resetNavigationInfo;
  }, [prevPath]);

  return (
    <ActivityForm
      onSuccess={goBack}
      initData={initData}
      onSubmit={createActivity}
      errorStore={$createActivityErrors}
      resetErrorStore={resetCreateActivityErrors}
      savedItemIdStore={$createdId}
      title="Добавление учебного мероприятия"
    >
      <ActivityFormContent
        categoryList={categoryList}
        categoryChangeAvailable={getCategoryListStatus === 'done'}
        onReset={goBack}
        statusStore={$createActivityStatus}
      />
    </ActivityForm>
  );
};
