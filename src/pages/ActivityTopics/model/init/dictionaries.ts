import { resolved } from '@src/gql-client';
import { connectReferenceListNodes } from '@utils/effector';
import {
  componentKindsStore,
  partTypesStore,
  topicGroupsStore,
  addTopicGroup,
  addTopicItem,
  updateTopicGroup,
  updateTopicItem,
} from '@src/pages/ActivityTopics/model';

import {
  getSpaceIdByActivityIdQuery,
  getActivityComponentKindsQuery,
  getActivityPartTypesQuery,
  getActivityTopicNodesQuery,
} from './queries';

connectReferenceListNodes({
  nodes: componentKindsStore,
  handler: async (activityId) => {
    const spaceId = await resolved(() => getSpaceIdByActivityIdQuery(activityId), { noCache: true });
    return await resolved(() => getActivityComponentKindsQuery(spaceId), { noCache: true });
  },
  resetOn: [addTopicGroup.reset, updateTopicGroup.reset],
});

connectReferenceListNodes({
  nodes: partTypesStore,
  handler: async (activityId) => {
    const spaceId = await resolved(() => getSpaceIdByActivityIdQuery(activityId), { noCache: true });
    return await resolved(() => getActivityPartTypesQuery(spaceId), { noCache: true });
  },
  resetOn: [addTopicItem.reset, updateTopicItem.reset],
});

connectReferenceListNodes({
  nodes: topicGroupsStore,
  query: (activityId) => getActivityTopicNodesQuery({ activityId, branchesOnly: true, flatten: true }),
  resetOn: [addTopicGroup.reset, updateTopicGroup.reset, addTopicItem.reset, updateTopicItem.reset],
});
