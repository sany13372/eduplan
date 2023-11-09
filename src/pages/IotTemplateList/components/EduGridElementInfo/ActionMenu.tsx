import { DropdownMenu, ItemProps } from '@kit-edu/dropdown-menu';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getPath, MfeRoutes } from '@constants/routes';
import { EduPlanParams } from '@src/types';
import { IotTemplateData } from '@src/pages/IotTemplateList/model/types';
import { deleteIotTemplate } from '@src/pages/IotTemplateList/model';
import { Icon } from '@kit-edu/icon';

const actionList: ItemProps[] = [
  { id: 'edit', label: 'Редактировать' },
  { id: 'remove', label: 'Удалить' },
];

export const ActionMenu = ({ item }: { item: IotTemplateData }): JSX.Element => {
  const history = useHistory();
  const { planId } = useParams<EduPlanParams>();

  const editHandler = () => {
    history.push(
      getPath(MfeRoutes.EDU_PLAN_INFO_IOT_TEMPLATE_EDIT, {
        ':planId': planId,
        ':iotTemplateId': item.id,
        ':gridElementId': item.eduGridElementId,
      }),
    );
  };

  const removeHandler = () => {
    deleteIotTemplate.setItem(item);
  };

  const onChange = (el: ItemProps) => {
    const { id } = el;
    const menuItem = actionList.find((e) => e.id === id);
    if (menuItem) {
      switch (menuItem.id) {
        case 'edit':
          editHandler();
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
      items={actionList}
      checked={[]}
      handleChecked={onChange}
      closeOnItemClick
      openNode={<Icon iconName="master-dots" className="cursor-pointer" size="16" />}
    />
  );
};
