import { Input } from '@kit-edu/input';
import { $fullNameFilter, setFullNameFilter } from '@src/pages/Events/model';
import React from 'react';
import { useStore } from 'effector-react';

export const FullnameFilter = () => {
  const filterValue = useStore($fullNameFilter);

  return (
    <div className="w-1/3 flex-grow-0">
      <Input
        appearance="white"
        clearable
        value={filterValue}
        placeholder="Поиск по ФИО"
        size="medium"
        onClearInput={() => setFullNameFilter('')}
        onChange={(e) => setFullNameFilter(e.target.value)}
      />
    </div>
  );
};
