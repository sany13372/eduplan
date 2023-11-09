import { connectUpdateActionNodes } from '@utils/effector';
import { convertCreateUpdateError } from '@src/pages/ActivityTopics/model/validation';
import { updateTopicGroup } from '@src/pages/ActivityTopics/model';
import { resolved } from '@src/gql-client';

import { updateTopicGroupQuery } from './queries/updateTopicGroupQuery';

connectUpdateActionNodes({
  nodes: updateTopicGroup,
  handler: async (topicGroup) => {
    const id = await resolved(() => updateTopicGroupQuery(topicGroup));

    return id;
  },
  convertErrors: convertCreateUpdateError,
});
