import React, { memo } from 'react';
import { setNewFilterVal } from '@src/pages/IotManagement/model';
import { Switch } from '@kit-edu/switch';
import { Typography } from '@kit-edu/typography';

type ShowAllFilterProps = {
  filterValue: boolean;
};
export const ShowAllFilter = memo(({ filterValue }: ShowAllFilterProps): JSX.Element => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFilterVal({ showAll: e.target.checked });
  };

  return (
    <div className="flex items-center">
      <Switch checked={filterValue} onChange={changeHandler} label="" />
      <Typography size="14px">Показывать обучающихся без ИОТ</Typography>
    </div>
  );
});
