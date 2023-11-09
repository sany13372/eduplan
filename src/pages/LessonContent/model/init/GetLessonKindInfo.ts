import { connectGetActionNodes } from '@utils/effector';
import { lessonKindInfoStore, resetDomain } from '@src/pages/LessonContent/model';
import { resolved } from '@src/gql-client';
import { getLessonKindInfo } from '@src/pages/LessonContent/model/init/queries/getLessonKindInfo';

connectGetActionNodes({
  nodes: lessonKindInfoStore,
  handler: async (lessonId) => {
    return resolved(() => getLessonKindInfo(lessonId), { noCache: true });
  },
  resetOn: [resetDomain],
});
