import { DropdownMenu, ItemProps } from '@kit-edu/dropdown-menu';
import { EduGridItem } from '@src/pages/ActivityList/model/types';
import React, { useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getPath, MfeRoutes } from '@constants/routes';
import { EduPlanParams } from '@src/types';
import { setDeleteEduPlanRow } from '@src/pages/ActivityList/model';
import { Icon } from '@kit-edu/icon';

const itemsGroup: ItemProps[] = [
  { id: 'edit', label: 'Редактировать' },
  { id: 'create', label: 'Добавить мероприятие' },
  { id: 'remove', label: 'Удалить' },
];

const itemsActivity: ItemProps[] = [
  { id: 'edit', label: 'Редактировать' },
  { id: 'remove', label: 'Удалить' },
];

export const ActivityGroupMenu = ({ item }: { item: EduGridItem }): JSX.Element => {
  const history = useHistory();
  const { planId } = useParams<EduPlanParams>();
  const menuItemsList = useMemo(() => (item.isGroup ? itemsGroup : itemsActivity), [item]);

  const editHandler = () => {
    if (item.isGroup) {
      history.push(
        getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_GROUP_EDIT, {
          ':planId': planId,
          ':groupId': item.id,
        }),
      );
    } else {
      history.push(
        getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_EDIT, {
          ':planId': planId,
          ':activityId': item.id,
        }),
      );
    }
  };
  const createHandler = () => {
    history.push(
      // getPath(MfeRoutes.EDU_PLAN_INFO_ACTIVITY_GROUP_ACTIVITY_CREATE, {
      getPath(
        MfeRoutes.EDU_PLAN_INFO_ACTIVITY_CREATE,
        {
          ':planId': planId,
          ':gridElementId': item.eduGridElementId,
        },
        { groupId: item.id },
      ),
    );
  };

  const removeHandler = () => {
    setDeleteEduPlanRow(item);
  };

  const onChange = (el: ItemProps) => {
    const { id } = el;
    const menuItem = menuItemsList.find((e) => e.id === id);
    if (menuItem) {
      switch (menuItem.id) {
        case 'edit':
          editHandler();
          break;
        case 'create':
          createHandler();
          break;
        case 'remove':
          removeHandler();
          break;
        default:
          break;
      }
    }
  };
  return (
    <DropdownMenu
      items={menuItemsList}
      checked={[]}
      closeOnItemClick
      handleChecked={onChange}
      openNode={<Icon iconName="master-dots" className="cursor-pointer" size="16" />}
    />
  );
};
