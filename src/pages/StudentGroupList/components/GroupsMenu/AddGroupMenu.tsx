import React, { FC } from 'react';
import { groupStudentModalApi, setIsNotPossibleCreateStudentModal } from '@src/pages/StudentGroupList/model';
import { baseGroupItemsActions, GroupItemEnum } from '@src/pages/StudentGroupList/model/constants';
import { ActionGroupMenuItem } from '@src/pages/StudentGroupList/components';
import { ItemProps } from '@kit-edu/dropdown-menu';
import { useIsPossibleCreateStudent } from '@src/hooks';

export const AddGroupMenu: FC = () => {
  const isPossibleCreateStudent = useIsPossibleCreateStudent();
  const onChangeMenuItem = (el: ItemProps) => {
    switch (el.id) {
      case GroupItemEnum.addStudent:
        if (isPossibleCreateStudent) {
          groupStudentModalApi.openAddStudent();
        } else {
          setIsNotPossibleCreateStudentModal(true);
        }
        break;
      case GroupItemEnum.addGroup:
        groupStudentModalApi.openAddGroup();
        break;
      case GroupItemEnum.importStudents:
        if (isPossibleCreateStudent) {
          groupStudentModalApi.openImportStudents();
        } else {
          setIsNotPossibleCreateStudentModal(true);
        }
        break;
      default:
        break;
    }
  };
  return (
    <ActionGroupMenuItem
      handleChecked={onChangeMenuItem}
      items={baseGroupItemsActions}
      openNodeTitle="Действия"
      appearance="black"
      dataTestId="addStudentGroupMenu"
    />
  );
};
