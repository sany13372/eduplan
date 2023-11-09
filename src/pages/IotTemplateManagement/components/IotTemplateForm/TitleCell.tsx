import { Activity } from '@src/pages/IotTemplateManagement/model/types';
import { Tooltip } from '@kit-edu/tooltip';
import { Typography } from '@kit-edu/typography';
import React from 'react';

type TitleCellProps = {
  data: Activity;
};
export const TitleCell = ({ data }: TitleCellProps): JSX.Element => {
  const { isGroup, activityTitle } = data;

  return (
    <div className="space-x-2 flex items-center ">
      <Tooltip
        trigger="mouseenter click"
        content={
          <Typography as="p" size="14px" className="whitespace-pre-wrap">
            {activityTitle}
          </Typography>
        }
      >
        <Typography as="p" size="14px" className={`truncate ${isGroup ? 'font-semibold ' : ''}`}>
          {activityTitle}
        </Typography>
      </Tooltip>
    </div>
  );
};
