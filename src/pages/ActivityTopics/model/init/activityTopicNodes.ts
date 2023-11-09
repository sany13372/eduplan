import { resolved } from '@src/gql-client';
import { activityTopicNodesStore, deleteTopicRow, resetActivityTopicList } from '@src/pages/ActivityTopics/model';
import { connectGetActionNodes } from '@utils/effector';
import { removeActivityTopicById } from '@src/pages/ActivityTopics/model/utils';

import { getActivityTopicNodesQuery } from './queries';

connectGetActionNodes({
  nodes: activityTopicNodesStore,
  handler: async (activityId) =>
    resolved(() => getActivityTopicNodesQuery({ activityId, branchesOnly: false, flatten: false }), { noCache: true }),
  resetOn: [resetActivityTopicList],
});

activityTopicNodesStore.$value.on(deleteTopicRow.deleteFx.done, (state, { params }) => {
  removeActivityTopicById(state, params.id);
  return [...state];
});
