import React, { FC } from 'react';
import { ActionGroupMenuItem } from '@src/pages/StudentGroupList/components';
import { groupStudentModalApi, deleteGroup, setGroupId } from '@src/pages/StudentGroupList/model';
import { AdvancedGroupItemEnum, advancedGroupItemsActions } from '@src/pages/StudentGroupList/model/constants';
import { ItemProps } from '@kit-edu/dropdown-menu';
import { EduPlanParams, getPath, MfeRoutes } from '@constants/routes';
import { useHistory, useParams } from 'react-router-dom';
import { Reference } from '@src/types';

interface GroupCardMenuProps {
  group: Reference;
}
export const GroupCardMenu: FC<GroupCardMenuProps> = ({ group }) => {
  const history = useHistory();
  const { planId } = useParams<EduPlanParams>();
  const onChange = (el: ItemProps) => {
    const { id } = el;
    const menuItem = advancedGroupItemsActions.find((e) => e.id === id);
    if (menuItem) {
      switch (menuItem.id) {
        case AdvancedGroupItemEnum.read:
          history.push(getPath(MfeRoutes.EDU_PLAN_INFO_GROUP_VIEW, { ':groupId': group.id, ':planId': planId }));
          break;
        case AdvancedGroupItemEnum.addNewStudent:
          groupStudentModalApi.openAddNewStudentToGroup(group.id);
          break;
        case AdvancedGroupItemEnum.chooseStudent:
          setGroupId(group.id);
          groupStudentModalApi.openChooseStudent();
          break;
        case AdvancedGroupItemEnum.editGroup:
          groupStudentModalApi.openEditGroup(group.id);
          break;
        case AdvancedGroupItemEnum.removeGroup:
          deleteGroup.setItem(group);
          break;
        default:
          break;
      }
    }
  };
  return (
    <ActionGroupMenuItem
      openNodeTitle="Действия"
      handleChecked={onChange}
      items={advancedGroupItemsActions}
      appearance="light-outline"
    />
  );
};
