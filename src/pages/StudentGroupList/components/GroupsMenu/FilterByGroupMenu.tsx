import React, { FC } from 'react';
import { $groupMenuTitleItems, $groupSelected, setGroupSelected } from '@src/pages/StudentGroupList/model';
import { ActionGroupMenuItem } from '@src/pages/StudentGroupList/components';
import { useStore } from 'effector-react';
import { selectGroupBaseItems } from '@src/pages/StudentGroupList/model/constants';

export const FilterByGroupMenu: FC = () => {
  const groupMenuTitleItems = useStore($groupMenuTitleItems);
  const groupSelected = useStore($groupSelected);
  return (
    <ActionGroupMenuItem
      classNameButton="w-80 flex justify-between mr-4 font-normal"
      openNodeTitle="Все группы"
      items={[...selectGroupBaseItems, ...groupMenuTitleItems]}
      appearance="white"
      checked={[groupSelected]}
      handleChecked={setGroupSelected}
      dataTestId="filterByGroup"
    />
  );
};
