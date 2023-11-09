import { ComboBoxFilter as ComboBoxFilterDefault } from '@components/ComboBoxFilter/ComboBoxFilter';
import React, { useMemo } from 'react';
import { useStore } from 'effector-react';
import { ItemProps } from '@kit-edu/selectbox';
import { $filters, eduGridElementStore, setGridElementListFilter } from '@src/pages/IotTemplateList/model';
import { defaultObj } from '@src/pages/IotTemplateList/model/constants';
import { Reference } from '@src/types';

export const ComboBoxFilter = (): JSX.Element => {
  const eduGridElementListDefault = useStore(eduGridElementStore.$value);
  const filters = useStore($filters);

  const options = useMemo(() => {
    return [defaultObj, ...eduGridElementListDefault];
  }, [eduGridElementListDefault]);

  const onSelect = (el: ItemProps) => {
    setGridElementListFilter([el] as Reference[]);
  };

  return (
    <div className="w-[350px]">
      <ComboBoxFilterDefault
        label="Семестр"
        value={filters.gridElementList[0]}
        options={options}
        onSelect={onSelect}
        isSubFilter
      />
    </div>
  );
};
