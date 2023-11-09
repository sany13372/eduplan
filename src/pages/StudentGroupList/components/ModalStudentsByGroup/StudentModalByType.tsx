import React, { FC } from 'react';
import { $groupStudentModalName, groupStudentModalApi, studentsUpdated } from '@src/pages/StudentGroupList/model';
import { CreateGroup, UpdateGroup } from '@src/pages/StudentGroupList/components';
import { useStore } from 'effector-react';
import { ModalType } from '@src/pages/StudentGroupList/model/types';
import { CreateStudentWidget, UpdateStudentWidget } from '@src/pages/GroupManagement';

export const StudentModalByType: FC = () => {
  const groupStudentModalName = useStore($groupStudentModalName).modalType;
  const studentId = useStore($groupStudentModalName).id;
  const { groupId } = useStore($groupStudentModalName);

  const modalTypes = {
    [ModalType.editGroup]: <UpdateGroup />,
    [ModalType.addGroup]: <CreateGroup />,
    [ModalType.editStudent]: (
      <UpdateStudentWidget
        onSuccess={studentsUpdated}
        studentId={studentId as string}
        modalApi={groupStudentModalApi}
        disabledFields={{
          email: true,
        }}
      />
    ),
    [ModalType.addStudent]: (
      <CreateStudentWidget
        onSuccess={studentsUpdated}
        modalApi={groupStudentModalApi}
        groupId={groupId}
        disabledFields={{
          group: !!groupId,
        }}
      />
    ),
    [ModalType.chooseStudent]: null,
    [ModalType.importStudents]: null,
  };
  return groupStudentModalName ? modalTypes[groupStudentModalName] : <></>;
};
