import React, { memo } from 'react';
import { Input } from '@kit-edu/input';
import { setNewFilterVal } from '@src/pages/IotManagement/model';

type FioFilterProps = {
  filterValue: string;
};
export const FioFilter = memo(({ filterValue }: FioFilterProps): JSX.Element => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFilterVal({ fio: e.target.value ?? '' });
  };

  return (
    <Input
      value={filterValue}
      iconName="master-search"
      placeholder="Поиск по ФИО"
      size="medium"
      onChange={changeHandler}
    />
  );
});
