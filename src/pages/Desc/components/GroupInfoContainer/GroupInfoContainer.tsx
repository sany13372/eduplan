import { FC } from 'react';
import { GroupDesc as GroupDescT } from '@src/pages/Desc/model/types';

import { GroupTitle } from './GroupTitle';
import { ContentCard } from './ContentCard';

type GroupInfoContainerProps = {
  titleInfo: GroupDescT;
};

export const GroupInfoContainer: FC<GroupInfoContainerProps> = ({ children, titleInfo }) => {
  return (
    <div className="space-y-6">
      <GroupTitle info={titleInfo} />
      <ContentCard>{children}</ContentCard>
    </div>
  );
};
