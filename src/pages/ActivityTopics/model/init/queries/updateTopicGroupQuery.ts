import { mutation } from '@src/gql-client';

import { TopicGroup } from '../../types';

export const updateTopicGroupQuery = (topicGroup: TopicGroup): string => {
  const data = mutation.addEditActivityPartGroup({
    activityPartGroupData: {
      id: topicGroup.id,
      parentId: topicGroup.parent?.id,
      componentKindId: topicGroup.componentKind.id,
      title: topicGroup.caption,
      shortTitle: topicGroup.shortTitle,
      eduPlanRowId: topicGroup.eduPlanRowId,
    },
  });

  return data.id!;
};
