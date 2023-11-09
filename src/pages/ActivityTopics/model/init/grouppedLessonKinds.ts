import { resolved } from '@src/gql-client';
import { grouppedLessonKindsStore, resetActivityTopicList } from '@src/pages/ActivityTopics/model';
import { connectGetActionNodes } from '@utils/effector';

import { getGrouppedLessonKindsQuery, getSpaceIdByActivityIdQuery } from './queries';

connectGetActionNodes({
  nodes: grouppedLessonKindsStore,
  handler: async (activityId) => {
    const spaceId = await resolved(() => getSpaceIdByActivityIdQuery(activityId), { noCache: true });
    return await resolved(() => getGrouppedLessonKindsQuery(spaceId), { noCache: true });
  },
  resetOn: [resetActivityTopicList],
});
