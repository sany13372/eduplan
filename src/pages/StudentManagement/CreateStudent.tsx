import React, { useCallback, useEffect } from 'react';
import './model/init';
import {useHistory, useParams, useRouteMatch} from 'react-router-dom';
import { EduPlanParams } from '@src/types';
import {
  courseStore,
  createStudentInfo,
  createStudentInfoInitialData,
  financingSourceStore,
  groupsStore,
  resetDomain,
  sexStore,
} from '@src/pages/StudentManagement/model';
import { StudentForm } from '@src/pages/StudentManagement/components';
import {getPath, MFE_PATH, MfeRoutes} from '@constants/routes';
import { resetNavigationInfo, setNavigationInfo } from '@src/app/model';
import { StudentInfo } from '@src/pages/StudentManagement/model/types';
import { useStore } from 'effector-react';
import { LoadingWrapper } from '@sber-universe/om-component-library';
import {groupStudentModalApi} from "@src/pages/StudentGroupList/model";

export const CreateStudent = (): JSX.Element => {
  const { planId } = useParams<EduPlanParams>();

  const history = useHistory();

  const { add, $validationErrors, $createdId, resetErrors } = createStudentInfo;
  const isGroupPage = useRouteMatch(`${MFE_PATH}${MfeRoutes.EDU_PLAN_INFO_GROUP_VIEW}`);
  const prevPath: string = getPath(MfeRoutes.EDU_PLAN_INFO_STUDENT, { ':planId': planId });
  const goBack = useCallback(() => {
    if (isGroupPage) {
      groupStudentModalApi.close();
      return;
    }
    history.push(prevPath);
  }, [history, prevPath]);

  useEffect(() => {
    setNavigationInfo({ label: 'К списку обучающихся', to: prevPath });
    return resetNavigationInfo;
  }, [prevPath]);

  useEffect(() => {
    sexStore.get(planId);
    courseStore.get(planId);
    financingSourceStore.get(planId);
    groupsStore.get(planId);
    createStudentInfoInitialData.get(planId);
  }, [planId]);

  const getInitDataStatus = useStore(createStudentInfoInitialData.$status);
  const initData = useStore(createStudentInfoInitialData.$value);

  useEffect(() => resetDomain, []);
  return (
    <LoadingWrapper loadingStatusList={[getInitDataStatus]} errorStatusList={[getInitDataStatus]}>
      <StudentForm<StudentInfo>
        onSuccess={goBack}
        initData={initData as StudentInfo}
        onSubmit={add}
        errorStore={$validationErrors}
        resetErrorStore={resetErrors}
        savedItemIdStore={$createdId}
        title="Добавление обучающегося"
        onReset={goBack}
      />
    </LoadingWrapper>
  );
};
