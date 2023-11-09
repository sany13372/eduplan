import { memo } from 'react';
import debounce from 'lodash/debounce';
import { TableGlobalFilterProps } from '@sber-universe/om-component-library/dist/Table';
import { GlobalFilterParams } from '@src/pages/EduPlansList/model/types';
import { EduFormFilter } from '@src/pages/EduPlansList/components/Filters/EduFormFilter';
import { EduTechnologyFilter } from '@src/pages/EduPlansList/components/Filters/EduTechnologyFilter';
import { CompetitionPeriodFilter } from '@src/pages/EduPlansList/components/Filters/CompetitionPeriodFilter';
import { EnrollmentYearFilter } from '@src/pages/EduPlansList/components/Filters/EnrollmentYearFilter';
import { EduStartDateFilter } from '@src/pages/EduPlansList/components/Filters/EduStartDateFilter';
import values from 'lodash/values';
import isPlainObject from 'lodash/isPlainObject';
import isUndefined from 'lodash/isUndefined';
import { Button } from '@kit-edu/button';

import { TitleFilter } from './TitleFilter';

const isEmptyObj = (obj: Record<string, unknown>): boolean => {
  return values(obj).every((x) => {
    if (isPlainObject(x)) return isEmptyObj(x as Record<string, unknown>);
    return isUndefined(x);
  });
};
export const Filters = memo(
  ({ globalFilter, setGlobalFilter }: TableGlobalFilterProps<GlobalFilterParams>): JSX.Element => {
    const customSetGlobalFilter = (value: GlobalFilterParams | undefined) => {
      if (!value || (value && isEmptyObj(value))) setGlobalFilter(undefined);
      else setGlobalFilter(value);
    };

    const resetFilters = () => setGlobalFilter(undefined);

    const customSetGlobalFilterDebounced = debounce(customSetGlobalFilter, 500, { maxWait: 5000 });
    return (
      <div className="flex flex-col space-y-8">
        <div className="w-2/3 sm:w-2/5">
          <TitleFilter globalFilter={globalFilter} setGlobalFilter={customSetGlobalFilterDebounced} />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <EduFormFilter globalFilter={globalFilter} setGlobalFilter={customSetGlobalFilter} />
          </div>
          <div className="col-span-4">
            <EduTechnologyFilter globalFilter={globalFilter} setGlobalFilter={customSetGlobalFilter} />
          </div>
          <div className="col-span-4">
            <CompetitionPeriodFilter globalFilter={globalFilter} setGlobalFilter={customSetGlobalFilter} />
          </div>
          <div className="col-span-4">
            <EnrollmentYearFilter globalFilter={globalFilter} setGlobalFilter={customSetGlobalFilter} />
          </div>
          <div className="col-span-6">
            <EduStartDateFilter globalFilter={globalFilter} setGlobalFilter={customSetGlobalFilter} />
          </div>

          <div className="flex items-center">
            <Button onClick={resetFilters} size="medium" appearance="dark-outline">
              Сбросить
            </Button>
          </div>
        </div>
      </div>
    );
  },
);
