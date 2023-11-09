import { Checkbox } from '@kit-edu/checkbox';
import React, { useMemo } from 'react';
import { Lesson } from '@src/pages/Lessons/model/types';
import { setSelectedImpls } from '@src/pages/Lessons/model';
import { xor } from 'lodash';
import { useSelectedImpls } from '@src/pages/Lessons/model/hooks';
import { getImplIdList, getParentId } from '@src/pages/Lessons/model/utils';

type SelectAllImplCellProps = {
  data: Lesson[];
};

export const SelectAllImplCell = ({ data }: SelectAllImplCellProps): JSX.Element => {
  const themeId = useMemo(() => {
    if (data.length === 0) return '';
    return getParentId(data[0].path);
  }, [data]);
  const isVisible = data.some((e) => e.elementType === 'lesson' && e.itemInfo.settings);
  const selectedImpls = useSelectedImpls(themeId);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedImpls({ isChecked: e.target.checked, items: data, themeId });

  const isChecked = useMemo(() => xor(getImplIdList(data), selectedImpls).length === 0, [data, selectedImpls]);

  return <>{isVisible && <Checkbox id={themeId} checked={isChecked} onChange={changeHandler} className="mx-auto" />}</>;
};
