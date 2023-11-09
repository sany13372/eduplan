import { ComboBoxFilter as ComboBoxFilterDefault } from '@components/ComboBoxFilter/ComboBoxFilter';
import React, { useMemo } from 'react';
import { useStore } from 'effector-react';
import { ItemProps } from '@kit-edu/selectbox';
import { Reference } from '@src/types';
import { $filters, setThemeFilter } from '@src/pages/Lessons/model';
import { defaultObj } from '@src/pages/Lessons/model/constants';
import { Lesson } from '@src/pages/Lessons/model/types';

type ComboBoxFilterProps = {
  data: Lesson[];
};
export const ComboBoxFilter = ({ data }: ComboBoxFilterProps): JSX.Element => {
  const filters = useStore($filters);

  const options = useMemo(() => {
    const resp: ItemProps[] = [];
    data.forEach((e) => {
      if (e.elementType === 'group')
        resp.push({
          id: e.groupInfo.id,
          caption: e.groupInfo.title,
        });
    });
    return [defaultObj, ...resp];
  }, [data]);

  const onSelect = (el: ItemProps) => {
    setThemeFilter([el] as Reference[]);
  };

  return <ComboBoxFilterDefault label="Тема" value={filters[0]} options={options} onSelect={onSelect} isSubFilter />;
};
