import React from 'react';
import { useStore } from 'effector-react';
import { $mfeBackground } from '@src/app/model';
import { usePlanCardNavInfo } from '@src/pages/ActivityManagement/model/hooks';
import { PageTitle } from '@src/components';

import { ActivityInfoDefault } from './ActivityInfoDefault';

export const ActivityInfo = (): JSX.Element => {
  const backgroundValue = useStore($mfeBackground);

  usePlanCardNavInfo();

  return (
    <ActivityInfoDefault
      background={backgroundValue}
      canEdit
      renderTitle={({ title, content }) => <PageTitle title={title}>{content}</PageTitle>}
    />
  );
};
