import { Checkbox } from '@kit-edu/checkbox';
import React, { useMemo } from 'react';
import { Lesson } from '@src/pages/Lessons/model/types';
import { $selectedImpls, setSelectedImpls } from '@src/pages/Lessons/model';
import { useStore } from 'effector-react';
import { getParentId } from '@src/pages/Lessons/model/utils';

type SelectImplCellProps = {
  data: Lesson;
};
export const SelectImplCell = ({ data }: SelectImplCellProps): JSX.Element => {
  const allSelectedImpls = useStore($selectedImpls);

  const themeId = useMemo(() => getParentId(data.path), [data]);

  const selectedImpls = allSelectedImpls[themeId] ?? [];
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedImpls({ isChecked: e.target.checked, items: [data], themeId });

  if (!data || data?.elementType === 'group') return <></>;

  const {
    itemInfo: { id, settings },
  } = data;
  return (
    <>
      {settings && (
        <Checkbox
          id={id}
          checked={selectedImpls.includes(settings.implId)}
          onChange={changeHandler}
          className="mx-auto"
        />
      )}
    </>
  );
};
