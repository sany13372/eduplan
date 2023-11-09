/* eslint-disable react-hooks/exhaustive-deps */
import { useStore } from 'effector-react';
import { TableGlobalFilterProps } from '@sber-universe/om-component-library';
import { $enrollmentYearList } from '@src/pages/EduPlansList/model';
import { ItemProps } from '@kit-edu/selectbox';
import { GlobalFilterParams } from '@src/pages/EduPlansList/model/types';
import { ComboBoxFilter } from '@src/components';
import { defaultEnrollmentYear } from '@src/pages/EduPlansList/model/constants';

export const EnrollmentYearFilter = ({
  setGlobalFilter,
  globalFilter,
}: TableGlobalFilterProps<GlobalFilterParams>): JSX.Element => {
  const enrollmentYearList = useStore($enrollmentYearList);
  const val =
    globalFilter?.enrollmentYear ||
    (globalFilter && Array.isArray(globalFilter.enrollmentYear) && globalFilter.enrollmentYear.length === 0)
      ? globalFilter.enrollmentYear
      : [defaultEnrollmentYear];

  const onSelect = (el: ItemProps) => {
    setGlobalFilter({ ...globalFilter, enrollmentYear: el.id === defaultEnrollmentYear.id ? undefined : [el] });
  };

  return <ComboBoxFilter label="Год набора" value={val[0]} options={enrollmentYearList} onSelect={onSelect} />;
};
