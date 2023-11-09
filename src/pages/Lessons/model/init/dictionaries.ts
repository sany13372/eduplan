import { resolved } from '@src/gql-client';
import { connectReferenceListNodes } from '@utils/effector';
import { eduKindStore, resetDomain } from '@src/pages/Lessons/model';
import { getThemeLessonKindListQuery } from '@src/pages/Lessons/model/init/queries';

connectReferenceListNodes({
  nodes: eduKindStore,
  handler: async (themeId) => resolved(() => getThemeLessonKindListQuery(themeId), { noCache: true }),
  resetOn: [resetDomain],
});
