import { Typography } from '@kit-edu/typography';
import React from 'react';
import { IotTemplateData } from '@src/pages/IotTemplateList/model/types';
import { ContentPanel } from '@sber-universe/om-component-library';

type IotTemplateItemProps = {
  data: IotTemplateData;
};
export const IotTemplateItem = ({ data }: IotTemplateItemProps) => {
  const { rows } = data;

  return (
    <ContentPanel className="space-y-6 px-8 py-4">
      {rows.map((row) => (
        <Typography as="p" size="20px" className="truncate" key={row.id}>
          {row.caption}
        </Typography>
      ))}
    </ContentPanel>
  );
};
