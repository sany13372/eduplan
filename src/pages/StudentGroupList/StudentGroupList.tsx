import React, { useEffect } from 'react';
import { Typography } from '@kit-edu/typography';
import { useMfeBackGround } from '@utils/hooks';
import {
  StudentsByGroup,
  DeleteStudentConfirmDialog,
  ExcludeStudentConfirmDialog,
  DeleteEduGroupConfirmDialog,
  NotPossibleCreateStudentErrorDialog,
} from '@src/pages/StudentGroupList/components';
import { useStore } from 'effector-react';
import { useParams } from 'react-router-dom';
import { EduPlanParams } from '@src/types';
import './model/init';
import {
  setEduPlanId,
  resetGroupSelected,
  resetStudentNameFilter,
  setBaseInfo,
  $getEduPlanGroupStatus,
  groupStudentsMap,
} from '@src/pages/StudentGroupList/model';
import { LoadingWrapper } from '@sber-universe/om-component-library';
import { GroupStudentModal } from '@src/pages/StudentGroupList/components/ModalStudentsByGroup/GroupStudentModal';
import { AddGroupMenu } from '@src/pages/StudentGroupList/components/GroupsMenu/AddGroupMenu';
import { FilterByGroupMenu } from '@src/pages/StudentGroupList/components/GroupsMenu';

import { useHasGroups, useHasStudents } from './model/hooks';
import { EmptyStudentsList } from './components/EmptyStudentsByGroupInfo';

const DialogGroup = () => {
  return (
    <>
      <DeleteStudentConfirmDialog />
      <ExcludeStudentConfirmDialog />
      <DeleteEduGroupConfirmDialog />
      <NotPossibleCreateStudentErrorDialog />
    </>
  );
};
type ContentWrapperProps = { showMenu?: boolean };
const ContentWrapper: React.FC<ContentWrapperProps> = ({ children, showMenu }) => (
  <div className="relative flex flex-col space-y-8">
    <div className="flex justify-between">
      <Typography as="h2" size="32px" fontWeight="semibold">
        Обучающиеся
      </Typography>
      {showMenu && <AddGroupMenu />}
    </div>
    {children}
  </div>
);
export const StudentGroupList = (): JSX.Element => {
  const { planId } = useParams<EduPlanParams>();
  useMfeBackGround('gray');
  const loadingGroupsStatus = useStore($getEduPlanGroupStatus);
  const loadingStudentsStatus = useStore(groupStudentsMap.$status);
  const statusList = [loadingGroupsStatus, loadingStudentsStatus];
  useEffect(() => {
    setEduPlanId(planId);
    setBaseInfo({ planId });
  }, [planId]);

  useEffect(() => {
    return () => {
      resetGroupSelected();
      resetStudentNameFilter();
    };
  }, []);
  const hasStudents = useHasStudents();
  const hasGroups = useHasGroups();
  const hasEmptyStudentsAndGroups = !hasGroups && !hasStudents;

  return (
    <div className="relative">
      <LoadingWrapper loadingStatusList={statusList} errorStatusList={statusList}>
        {!hasEmptyStudentsAndGroups ? (
          <ContentWrapper showMenu={!hasGroups}>
            {hasGroups && (
              <div className="flex justify-between">
                <div className="flex gap-3 w-full">
                  <FilterByGroupMenu />
                  {/* <StudentFilter /> */}
                </div>
                <AddGroupMenu />
              </div>
            )}
            <StudentsByGroup />
          </ContentWrapper>
        ) : (
          <ContentWrapper showMenu>
            <EmptyStudentsList />
          </ContentWrapper>
        )}
        <GroupStudentModal planId={planId} />
        <DialogGroup />
      </LoadingWrapper>
    </div>
  );
};
