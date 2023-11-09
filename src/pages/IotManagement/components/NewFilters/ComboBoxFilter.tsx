import { ComboBoxFilter as ComboBoxFilterDefault } from '@components/ComboBoxFilter/ComboBoxFilter';
import React, { useMemo } from 'react';
import { useStore } from 'effector-react';
import { ItemProps } from '@kit-edu/selectbox';
import { eduGridElements, setNewFilterVal } from '@src/pages/IotManagement/model';
import { defauleEduGridElementItem } from '@src/pages/IotManagement/model/constants';
import { EduGridElementObj } from '@src/pages/IotManagement/model/types';

type ComboBoxFilterProps = {
  filterValue: EduGridElementObj;
};
export const ComboBoxFilter = ({ filterValue }: ComboBoxFilterProps): JSX.Element => {
  const eduGridElementList = useStore(eduGridElements.$value);
  const options = useMemo(() => {
    return [defauleEduGridElementItem, ...eduGridElementList];
  }, [eduGridElementList]);

  const onSelect = (el: ItemProps) => {
    setNewFilterVal({ gridElement: el as EduGridElementObj });
  };

  return (
    <div className="w-full">
      <ComboBoxFilterDefault label="Семестр" value={filterValue} options={options} onSelect={onSelect} isSubFilter />
    </div>
  );
};
