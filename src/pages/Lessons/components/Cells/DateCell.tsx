import { Typography } from '@kit-edu/typography';
import React, { useMemo } from 'react';
import { Lesson, LessonSettings } from '@src/pages/Lessons/model/types';
import { localDateStringToDate } from '@utils/date';

type TitleCellProps = {
  data: Lesson;
  property: keyof Omit<LessonSettings, 'id'>;
};

export const DateCell = ({ data, property }: TitleCellProps): JSX.Element => {
  const selectedProperty = useMemo(() => {
    if (data.elementType === 'group') return '';

    const settings = data?.itemInfo?.settings;
    const val = settings && settings[property] ? localDateStringToDate(settings[property] as string) : undefined;
    return !val ? '' : `${val.toLocaleDateString('ru')} ${val.toLocaleTimeString('ru', { timeStyle: 'short' })}`;
  }, [data, property]);

  return (
    <Typography as="p" size="14px" className="truncate">
      {selectedProperty}
    </Typography>
  );
};
