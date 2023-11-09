import React, { memo, useEffect, useState } from 'react';
import { TableGlobalFilterProps } from '@sber-universe/om-component-library';
import { GlobalFilterParams } from '@src/pages/EduPlansList/model/types';
import { Input } from '@kit-edu/input';

export const TitleFilter = memo(
  ({ setGlobalFilter, globalFilter }: TableGlobalFilterProps<GlobalFilterParams>): JSX.Element => {
    const [val, setVal] = useState<string | undefined>(undefined);
    const globalFilterVal = globalFilter?.title;

    useEffect(() => {
      if (!globalFilterVal) setVal(globalFilterVal);
    }, [globalFilterVal]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setVal(e.target.value);
      setGlobalFilter({ ...globalFilter, title: e.target.value });
    };

    return (
      <Input
        value={val ?? ''}
        iconName="master-search"
        placeholder="Поиск по названию"
        size="medium"
        onChange={changeHandler}
        data-testid="searchEduPlanTitle"
      />
    );
  },
);
