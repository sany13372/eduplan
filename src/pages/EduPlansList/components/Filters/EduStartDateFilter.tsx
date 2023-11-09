/* eslint-disable react-hooks/exhaustive-deps */
import { useStore } from 'effector-react';
import { TableGlobalFilterProps } from '@sber-universe/om-component-library';
import { $eduStartDateList } from '@src/pages/EduPlansList/model';
import { ItemProps } from '@kit-edu/selectbox';
import { GlobalFilterParams } from '@src/pages/EduPlansList/model/types';
import { useMemo } from 'react';
import { ComboBoxFilter } from '@src/components';
import { defaultEduStartDate, emptyEduStartDate } from '@src/pages/EduPlansList/model/constants';
import { Typography } from '@kit-edu/typography';

export const EduStartDateFilter = ({
  setGlobalFilter,
  globalFilter,
}: TableGlobalFilterProps<GlobalFilterParams>): JSX.Element => {
  const eduStartDateList = useStore($eduStartDateList);

  const onFromSelect = (el: ItemProps) => {
    const isDefaultEduStartDate = el.id === defaultEduStartDate.id;
    const eduStartDateFromValue = !isDefaultEduStartDate ? el : undefined;
    const eduStartDateToValue = globalFilter?.eduStartDate?.to;
    const val =
      eduStartDateToValue || eduStartDateFromValue
        ? { from: eduStartDateFromValue, to: eduStartDateToValue }
        : undefined;
    setGlobalFilter({ ...globalFilter, eduStartDate: val });
  };

  const onToSelect = (el: ItemProps) => {
    const isDefaultEduStartDate = el.id === defaultEduStartDate.id;
    const eduStartDateFromValue = globalFilter?.eduStartDate?.from;
    const eduStartDateToValue = !isDefaultEduStartDate ? el : undefined;
    const val =
      eduStartDateToValue || eduStartDateFromValue
        ? { from: eduStartDateFromValue, to: eduStartDateToValue }
        : undefined;
    setGlobalFilter({ ...globalFilter, eduStartDate: val });
  };
  const fromVal = globalFilter?.eduStartDate?.from ?? defaultEduStartDate;
  const toVal = globalFilter?.eduStartDate?.to ?? defaultEduStartDate;

  const fromOptions = useMemo(() => {
    const to = globalFilter?.eduStartDate?.to?.id;
    if (!to) return eduStartDateList;

    return eduStartDateList.filter(
      (e) => e.id === defaultEduStartDate.id || e.id === emptyEduStartDate.id || e.id <= to,
    );
  }, [toVal.id, eduStartDateList]);
  const toOptions = useMemo(() => {
    const from = globalFilter?.eduStartDate?.from?.id;
    if (!from) return eduStartDateList;

    return eduStartDateList.filter(
      (e) => e.id === defaultEduStartDate.id || e.id === emptyEduStartDate.id || e.id >= from,
    );
  }, [fromVal.id, eduStartDateList]);

  return (
    <div className="flex space-x-4 items-center">
      <Typography as="p" size="14px" className="w-1/5">
        Дата начала обучения
      </Typography>
      <div className="flex-grow">
        <ComboBoxFilter label="От" value={fromVal} options={fromOptions} onSelect={onFromSelect} isSubFilter />
      </div>
      <div className="flex-grow">
        <ComboBoxFilter label="До" value={toVal} options={toOptions} onSelect={onToSelect} isSubFilter />
      </div>
    </div>
  );
};
