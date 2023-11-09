import { Typography } from '@kit-edu/typography';
import React from 'react';
import { IotTemplateData } from '@src/pages/IotManagement/model/types';

type IotTemplateItemProps = {
  data: IotTemplateData;
};
export const IotTemplateItem = ({ data }: IotTemplateItemProps) => {
  const { rows, caption } = data;

  return (
    <div className="space-y-8">
      <Typography as="h3" size="24px" fontWeight="semibold" className="truncate">
        {caption}
      </Typography>
      <div className="space-y-6 pl-8">
        {rows.map((row) => (
          <Typography as="p" size="20px" className="truncate" key={row.id}>
            {row.caption}
          </Typography>
        ))}
      </div>
    </div>
  );
};
