import { excludeStudent, groupStudentModalApi, deleteStudent } from '@src/pages/StudentGroupList/model';
import { Button } from '@kit-edu/button';
import { DropdownMenu, ItemProps } from '@kit-edu/dropdown-menu';
import React, { FC } from 'react';
import { ShortUserInfo } from '@src/pages/StudentGroupList/model/types';
import { StudentCardItemEnum, studentCardItemsActions } from '@src/pages/StudentGroupList/model/constants';

interface StudentCardMenuProps {
  student: ShortUserInfo;
}
export const StudentCardMenu: FC<StudentCardMenuProps> = ({ student }) => {
  const menuActions = student.groupId
    ? studentCardItemsActions
    : studentCardItemsActions.filter(({ id }) => id !== StudentCardItemEnum.exclude);

  const onChange = (el: ItemProps) => {
    switch (el.id) {
      case StudentCardItemEnum.edit:
        groupStudentModalApi.openEditStudent(student.id);
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
  };

  return (
    <DropdownMenu
      items={menuActions}
      checked={[]}
      handleChecked={onChange}
      closeOnItemClick
      openNode={<Button iconLeftName="master-range" appearance="white" />}
    />
  );
};
