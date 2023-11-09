import { EduGridItem } from '@src/pages/ActivityList/model/types';
import React from 'react';
import { Typography } from '@kit-edu/typography';
import { EduGridElementActions } from '@src/pages/ActivityList/components';

import { Table } from './Table';

type EduGridElementInfoProps = {
  title: string;
  eduProgId: string;
  eduPlanId: string;
  gridElementId: string;
  activityList: EduGridItem[];
};
export const EduGridElementInfo = ({ activityList, title, ...props }: EduGridElementInfoProps): JSX.Element => {
  const { gridElementId } = props;
  const data = activityList.filter((e) => e.eduGridElementId === gridElementId);

  return (
    <div className="space-y-[30px]" data-testid="eduGridElementBlock">
      <div className="flex space-x-4 justify-between items-center">
        <Typography as="h3" size="18px" fontWeight="semibold">
          {title}
        </Typography>
        <EduGridElementActions info={props} itemName={title} />
      </div>
      <Table data={data} />
    </div>
  );
};
