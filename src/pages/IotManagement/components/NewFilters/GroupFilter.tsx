import { ComboBoxFilter as ComboBoxFilterDefault } from '@components/ComboBoxFilter/ComboBoxFilter';
import React, { useMemo } from 'react';
import { useStore } from 'effector-react';
import { ItemProps } from '@kit-edu/selectbox';
import { defaultGroupObj, emptyGroupObj } from '@src/pages/IotManagement/model/constants';
import { GroupObj } from '@src/pages/IotManagement/model/types';
import { groupList, setNewFilterVal } from '@src/pages/IotManagement/model';

type GroupFilterProps = {
  filterValue: GroupObj;
};

export const GroupFilter = ({ filterValue }: GroupFilterProps): JSX.Element => {
  const defaultOptList = useStore(groupList.$value);

  const options = useMemo(() => {
    return [defaultGroupObj, emptyGroupObj, ...defaultOptList];
  }, [defaultOptList]);

  const onSelect = (el: ItemProps) => {
    setNewFilterVal({
      group: el as GroupObj,
    });
  };

  return <ComboBoxFilterDefault label="Группа" value={filterValue} options={options} onSelect={onSelect} isSubFilter />;
};
