import React from 'react';
import { Lesson } from '@src/pages/Lessons/model/types';
import { Typography } from '@kit-edu/typography';

type IsAlwaysAllowCellProps = {
  data: Lesson;
};
export const IsAlwaysAllowCell = ({ data }: IsAlwaysAllowCellProps): JSX.Element => {
  if (data.elementType === 'group') return <></>;

  const {
    itemInfo: { settings },
  } = data;

  if (!settings) return <></>;

  return (
    <Typography as="p" size="14px" className="text-center">
      {settings.isAllowAlways ? 'да' : 'нет'}
    </Typography>
  );
};
