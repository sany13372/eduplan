import React, { memo } from 'react';
import { Input } from '@kit-edu/input';
import { useStore } from 'effector-react';
import { $filters, setTitleFilter } from '@src/pages/IotTemplateList/model';

export const TitleFilter = memo((): JSX.Element => {
  const filters = useStore($filters);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleFilter(e.target.value);
  };

  return (
    <div className="w-1/3">
      <Input
        value={filters.title}
        iconName="master-search"
        placeholder="Поиск по названию"
        size="medium"
        onChange={changeHandler}
      />
    </div>
  );
});
