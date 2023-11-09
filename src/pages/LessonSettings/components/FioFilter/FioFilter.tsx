import React, { useEffect, useMemo, useState } from 'react';
import { Input } from '@kit-edu/input';
import debounce from 'lodash/debounce';
import { Event } from 'effector';

type FioFilterProps = {
  defaultValue: string;
  changeHandler: Event<string>;
};
export const FioFilter = ({ defaultValue, changeHandler }: FioFilterProps) => {
  const [value, setValue] = useState(defaultValue);
  const onFilterReset = () => {
    setValue('');
  };
  const debouncedHandler = useMemo(() => debounce(changeHandler, 300), [changeHandler]);
  const onFilterUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    debouncedHandler(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <Input
      value={value}
      placeholder="Поиск по ФИО"
      appearance="white"
      colorMode="onDark"
      className="w-[480px]"
      clearable
      onChange={onFilterUpdate}
      onClearInput={onFilterReset}
    />
  );
};
