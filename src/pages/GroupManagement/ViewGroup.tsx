import React, { useEffect } from 'react';
import '@src/pages/ActivityManagement/model/init';
import { useParams } from 'react-router-dom';
import { getPath, MfeRoutes } from '@constants/routes';
import { resetNavigationInfo, setNavigationInfo } from '@src/app/model';
import { eduGroupInfo, groupStudentsInitial, resetDomain, setPageParams } from '@src/pages/GroupManagement/model';
import { useStore } from 'effector-react';
import { ErrorMessage } from '@src/components';
import { Label, LoadingOverlay, LoadingWrapper } from '@sber-universe/om-component-library';
import { StudentListTable } from '@src/pages/StudentList';
import { Typography } from '@kit-edu/typography';
import { useMfeBackGround } from '@utils/hooks';
import { defaultGroupStudentsInfo } from '@src/pages/GroupManagement/model/constants';

import { GroupInfo, GroupManagementModal, ManageGroup, ManageStudents } from './components';

import './model/init';

export const ViewGroup = (): JSX.Element => {
  const { planId, groupId } = useParams<{ planId: string; groupId: string }>();

  const groupData = useStore(eduGroupInfo.$value);
  const eduGroupInfoStatus = useStore(eduGroupInfo.$status);
  const groupStudentsInitialStatus = useStore(groupStudentsInitial.$status);
  useMfeBackGround('gray');

  useEffect(() => {
    eduGroupInfo.get(groupId);
    groupStudentsInitial.get({ groupId, data: defaultGroupStudentsInfo });
  }, [groupId]);

  useEffect(() => {
    setPageParams({ groupId, planId });
  }, [groupId, planId]);

  const prevPath: string = getPath(MfeRoutes.EDU_PLAN_INFO_STUDENT_GROUP_LIST, {
    ':planId': planId,
    ':groupId': groupId,
  });

  useEffect(() => {
    setNavigationInfo({ label: 'К обучающимся', to: prevPath });
    return resetNavigationInfo;
  }, [prevPath]);

  return (
    <LoadingWrapper errorStatusList={[eduGroupInfoStatus]} loadingStatusList={[eduGroupInfoStatus]}>
      {groupData && <ManageGroup groupData={groupData} />}
      {groupData && <GroupInfo groupData={groupData} />}
      <LoadingWrapper errorStatusList={[groupStudentsInitialStatus]} loadingStatusList={[groupStudentsInitialStatus]}>
        <ManageStudents />
      </LoadingWrapper>
      <GroupManagementModal />
    </LoadingWrapper>
  );
};

export const OldViewGroup = (): JSX.Element => {
  const { planId, groupId } = useParams<{ planId: string; groupId: string }>();

  const groupData = useStore(eduGroupInfo.$value);
  const status = useStore(eduGroupInfo.$status);

  useMfeBackGround('gray');

  useEffect(() => resetDomain, []);

  useEffect(() => {
    eduGroupInfo.get(groupId);
  }, [groupId]);

  const prevPath: string = getPath(MfeRoutes.EDU_PLAN_INFO_GROUP_LIST, { ':planId': planId });

  useEffect(() => {
    setNavigationInfo({ label: 'К списку учебных групп', to: prevPath });
    return resetNavigationInfo;
  }, [prevPath]);

  if (status === 'pending') return <LoadingOverlay loading />;
  if (status === 'fail') return <ErrorMessage />;

  return (
    <div className="space-y-8">
      <Typography as="h2" size="32px" fontWeight="semibold">
        Данные учебной группы
      </Typography>
      {groupData && (
        <div className="flex flex-col space-y-8">
          <Typography as="h3" size="24px" fontWeight="semibold" className="break-all">
            {groupData.title}
          </Typography>
          <div className="space-y-6 flex flex-col">
            <Label caption="Образовательная программа">{groupData.eduProgramTitle}</Label>
            <Label caption="План обучения">{groupData.eduPlanTitle}</Label>
            <Label caption="Форма обучения">{groupData.eduFormTitle}</Label>
            <Label caption="Технология обучения">{groupData.eduTechnologyTitle}</Label>
            <Label caption="Срок освоения">{groupData.completitionPeriodTitle}</Label>

            {groupData.enrollmentYear && <Label caption="Год набора">{groupData.enrollmentYear}</Label>}
            {groupData.eduStartDate && (
              <Label caption="Дата начала обучения">{groupData.eduStartDate.toLocaleDateString()}</Label>
            )}
          </div>
          <Typography as="h3" size="24px" fontWeight="semibold" className="break-all">
            Обучающиеся
          </Typography>
          <div className="pb-2">
            <StudentListTable eduPlanId={planId} eduGroupId={groupId} />
          </div>
        </div>
      )}
    </div>
  );
};
