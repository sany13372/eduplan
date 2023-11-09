import { Button } from '@kit-edu/button';
import { DropdownMenu, ItemProps } from '@kit-edu/dropdown-menu';
import React, { FC } from 'react';
import { StudentInfo } from '@src/pages/GroupManagement/model/types';
import { StudentCardItemEnum, studentCardItemsActions } from '@src/pages/GroupManagement/model/constants';
import { groupManagementModalApi, deleteStudent, excludeStudent } from '@src/pages/GroupManagement/model';

interface StudentCardMenuProps {
  student: StudentInfo;
}
export const StudentCardMenu: FC<StudentCardMenuProps> = ({ student }) => {
  const onChange = (el: ItemProps) => {
    if (el) {
      switch (el.id) {
        case StudentCardItemEnum.edit:
          groupManagementModalApi.openEditStudent(student.id);
          break;
        case StudentCardItemEnum.exclude:
          excludeStudent.setItem(student);
          break;
        case StudentCardItemEnum.remove:
          deleteStudent.setItem(student);
          break;
        default:
          break;
      }
    }
  };
  return (
    <DropdownMenu
      items={studentCardItemsActions}
      checked={[]}
      handleChecked={onChange}
      closeOnItemClick
      openNode={<Button size="medium" iconLeftName="master-range" appearance="white" />}
    />
  );
};
