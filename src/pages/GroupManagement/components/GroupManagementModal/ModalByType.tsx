import React, { FC } from 'react';
import { useStore } from 'effector-react';
import { ModalType } from '@src/pages/GroupManagement/model/types';
import { $groupManagementModalName, groupManagementModalApi } from '@src/pages/GroupManagement/model';
import { UpdateGroup } from '@src/pages/GroupManagement/components';
import { useParams } from 'react-router-dom';
import { ActivityGroupParams } from '@constants/routes';
import { CreateStudentWidget, UpdateStudentWidget } from '@src/pages/GroupManagement';

export const GroupModalByType: FC = () => {
  const groupStudentModalName = useStore($groupManagementModalName).modalType;
  const studentId = useStore($groupManagementModalName).id;
  const { groupId } = useParams<ActivityGroupParams>();

  // TODO: Отрефакторить работу с модалками т.к на текущее решение не даёт возможности аккуратно реализовать  подтверждение закрытия диалога. Поэтому логика для модалки выбора студентов перенесена в GroupManagementModal
  const modalTypes = {
    [ModalType.editGroup]: <UpdateGroup />,
    [ModalType.editStudent]: (
      <UpdateStudentWidget
        studentId={studentId as string}
        modalApi={groupManagementModalApi}
        disabledFields={{
          email: true,
          group: true,
        }}
      />
    ),
    [ModalType.addStudent]: (
      <CreateStudentWidget
        groupId={groupId}
        modalApi={groupManagementModalApi}
        disabledFields={{
          group: true,
        }}
      />
    ),
    [ModalType.chooseStudent]: null,
  };
  return groupStudentModalName ? modalTypes[groupStudentModalName] : <></>;
};
