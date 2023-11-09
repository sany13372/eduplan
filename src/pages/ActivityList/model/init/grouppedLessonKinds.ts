import { resolved } from '@src/gql-client';
import { grouppedLessonKindsStore, resetDomainData } from '@src/pages/ActivityList/model';
import { connectGetActionNodes } from '@utils/effector';

import { getGrouppedLessonKindsQuery, getSpaceIdByEduProgIdQuery } from './queries';

connectGetActionNodes({
  nodes: grouppedLessonKindsStore,
  handler: async (eduProgId) => {
    const spaceId = await resolved(() => getSpaceIdByEduProgIdQuery(eduProgId), { noCache: true });
    const groupedLessonKinds = await resolved(() => getGrouppedLessonKindsQuery(spaceId), { noCache: true });
    return groupedLessonKinds.filter((e) => e.lessonKinds.length > 0);
  },

  resetOn: [resetDomainData],
});
