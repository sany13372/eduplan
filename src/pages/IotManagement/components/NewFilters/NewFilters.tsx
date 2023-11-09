import { Button } from '@kit-edu/button';
import { $newFilters, resetNewFilterVal } from '@src/pages/IotManagement/model';
import { useStore } from 'effector-react';
import { ContentPanel } from '@sber-universe/om-component-library';

import { ComboBoxFilter } from './ComboBoxFilter';
import { GroupFilter } from './GroupFilter';

export const NewFilters = () => {
  const onResetClick = () => resetNewFilterVal();
  const { group, gridElement } = useStore($newFilters);
  return (
    <ContentPanel className="grid grid-cols-1 md:grid-cols-8 py-4 px-6 gap-4 items-center">
      <div className="col-span-1 md:col-span-3">
        <ComboBoxFilter filterValue={gridElement} />
      </div>
      <div className="col-span-1 md:col-span-3">
        <GroupFilter filterValue={group} />
      </div>

      <div className="col-span-1 md:col-span-2">
        <Button appearance="dark-outline" size="medium" onClick={onResetClick}>
          Сбросить
        </Button>
      </div>
    </ContentPanel>
  );
};
