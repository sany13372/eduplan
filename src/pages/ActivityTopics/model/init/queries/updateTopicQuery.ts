import { mutation } from '@src/gql-client';

import { TopicItem } from '../../types';

export const updateTopicQuery = (topicItem: TopicItem): string => {
  const { id } = mutation.addEditActivityPart({
    activityPartData: {
      id: topicItem.id,
      title: topicItem.caption,
      hoursData: topicItem.efforts,
      partTypeId: topicItem.partType.id,
      parentId: topicItem.parent?.id,
      eduPlanRowId: topicItem.eduPlanRowId,
    },
  });

  return id!;
};
