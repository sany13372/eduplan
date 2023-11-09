import { FC, ChangeEvent } from 'react';
import { Input } from '@kit-edu/input';
import { $studentNameFilter, setStudentNameFilter } from '@src/pages/StudentGroupList/model';
import { useStore } from 'effector-react';

export const StudentFilter: FC = () => {
  const studentNameFilter = useStore($studentNameFilter);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setStudentNameFilter(e.target.value);
  const onClearInput = () => setStudentNameFilter('');

  return (
    <Input
      appearance="white"
      value={studentNameFilter}
      className="max-w-xs"
      iconName="master-search"
      placeholder="Поиск по ФИО"
      onClearInput={onClearInput}
      size="medium"
      onChange={onChangeHandler}
      colorMode="onDark"
    />
  );
};
