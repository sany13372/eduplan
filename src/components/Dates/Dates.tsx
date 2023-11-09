import React, { useMemo } from 'react';
import { Typography } from '@kit-edu/typography';
import { ReactComponent as PointIcon } from '@src/assets/icons/common/smallIcon.svg';
import { ReactComponent as GrayPointIcon } from '@src/assets/icons/common/smallIconGray.svg';
import { isValid } from 'date-fns';
import { TextGroup } from '@src/components';

export type DateInfoProps = { date: Date; label: string; iconType?: 'primary' | 'secondary' };

export const DateInfo = ({ date, label, iconType = 'primary' }: DateInfoProps) => {
  const dateValue = useMemo(() => date.toLocaleDateString('ru'), [date]);
  const timeValue = useMemo(() => date.toLocaleTimeString('ru', { timeStyle: 'short' }), [date]);
  return (
    <TextGroup mainText={dateValue} secondaryText={label}>
      {iconType === 'primary' ? <PointIcon width={3} height={3} /> : <GrayPointIcon width={3} height={3} />}
      <Typography as="p" size="14px" color="medium">
        {timeValue}
      </Typography>
    </TextGroup>
  );
};

export type DateInfoPanelProps = {
  startDate: string;
  startLabel?: string;
  endDate: string;
  endLabel?: string;
};

export const DateRangeInfo = ({
  startDate,
  startLabel = 'Начало',
  endLabel = 'Окончание',
  endDate,
}: DateInfoPanelProps) => {
  const startDateVal = useMemo(() => new Date(startDate), [startDate]);
  const endDateVal = useMemo(() => new Date(endDate), [endDate]);
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-x-[30px] md:space-y-0">
      {isValid(startDateVal) && <DateInfo date={startDateVal} label={startLabel} />}
      {isValid(endDateVal) && <DateInfo date={endDateVal} label={endLabel} />}
    </div>
  );
};
