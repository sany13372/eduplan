/* eslint-disable react-hooks/exhaustive-deps */
import { useStore } from 'effector-react';
import { TableGlobalFilterProps } from '@sber-universe/om-component-library';
import { $eduFormList } from '@src/pages/EduPlansList/model';
import { ItemProps } from '@kit-edu/selectbox';
import { GlobalFilterParams } from '@src/pages/EduPlansList/model/types';
import { ComboBoxFilter } from '@src/components';
import { useMemo } from 'react';
import { defaultEduForm } from '@src/pages/EduPlansList/model/constants';

export const EduFormFilter = ({
  setGlobalFilter,
  globalFilter,
}: TableGlobalFilterProps<GlobalFilterParams>): JSX.Element => {
  const eduFormList = useStore($eduFormList);
  const options = useMemo(() => {
    return [defaultEduForm, ...eduFormList];
  }, [eduFormList]);
  const val = globalFilter?.eduForm ?? defaultEduForm;

  const onSelect = (el: ItemProps) => {
    const isDefaultEduForm = el.id === defaultEduForm.id;
    const eduFormValue = !isDefaultEduForm ? el : undefined;
    setGlobalFilter({ ...globalFilter, eduForm: eduFormValue });
  };

  return <ComboBoxFilter label="Форма обучения" value={val} options={options} onSelect={onSelect} />;
};
