import { Typography } from '@kit-edu/typography';
import React, { useMemo } from 'react';
import { Lesson } from '@src/pages/Lessons/model/types';

type TypeCellProps = {
  data: Lesson;
};
export const TypeCell = ({ data }: TypeCellProps): JSX.Element => {
  const title = useMemo(() => {
    return data.elementType !== 'group' ? data.itemInfo.eduKind.caption : '';
  }, [data]);

  return (
    <Typography as="p" size="14px" className="truncate">
      {title}
    </Typography>
  );
};
