import { connectUpdateActionNodes } from '@utils/effector';
import { convertCreateUpdateError } from '@src/pages/ActivityTopics/model/validation';
import { updateTopicItem } from '@src/pages/ActivityTopics/model';
import { resolved } from '@src/gql-client';

import { updateTopicQuery } from './queries/updateTopicQuery';

connectUpdateActionNodes({
  nodes: updateTopicItem,
  handler: async (topicGroup) => {
    const id = await resolved(() => updateTopicQuery(topicGroup));

    return id;
  },
  convertErrors: convertCreateUpdateError,
});
