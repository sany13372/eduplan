import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';
import { GetLessonInitDataParams, LessonItemShort } from '@src/pages/Lessons/model/types';
import { saveLessonInitialData, resetDomain } from '@src/pages/Lessons/model';

import { getActivityRowInfoQuery, getShortLessonInfoQuery } from './queries';

connectGetActionNodes<GetLessonInitDataParams, LessonItemShort | null>({
  nodes: saveLessonInitialData,
  handler: async ({ themeId, lessonId }) => {
    let resp = await resolved(() => getActivityRowInfoQuery(themeId), { noCache: true });
    if (lessonId) resp = await resolved(() => getShortLessonInfoQuery(lessonId, resp), { noCache: true });
    return resp;
  },
  resetOn: [resetDomain],
});
