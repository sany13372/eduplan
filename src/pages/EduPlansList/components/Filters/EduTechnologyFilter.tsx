/* eslint-disable react-hooks/exhaustive-deps */
import { useStore } from 'effector-react';
import { TableGlobalFilterProps } from '@sber-universe/om-component-library';
import { $eduTechnologyList } from '@src/pages/EduPlansList/model';
import { ItemProps } from '@kit-edu/selectbox';
import { GlobalFilterParams } from '@src/pages/EduPlansList/model/types';
import { ComboBoxFilter } from '@src/components';
import { useMemo } from 'react';
import { defaultEduTechnology } from '@src/pages/EduPlansList/model/constants';

export const EduTechnologyFilter = ({
  setGlobalFilter,
  globalFilter,
}: TableGlobalFilterProps<GlobalFilterParams>): JSX.Element => {
  const eduTechnologyList = useStore($eduTechnologyList);
  const options = useMemo(() => {
    return [defaultEduTechnology, ...eduTechnologyList];
  }, [eduTechnologyList]);
  const val = globalFilter?.eduTechnology ?? defaultEduTechnology;

  const onSelect = (el: ItemProps) => {
    const isDefaultEduTechnology = el.id === defaultEduTechnology.id;
    const eduTechnologyValue = !isDefaultEduTechnology ? el : undefined;
    setGlobalFilter({ ...globalFilter, eduTechnology: eduTechnologyValue });
  };

  return <ComboBoxFilter label="Технология обучения" value={val} options={options} onSelect={onSelect} />;
};
