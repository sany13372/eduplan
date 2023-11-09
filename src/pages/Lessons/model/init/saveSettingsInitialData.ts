import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';
import { GetSettingsInitDataParams, LessonSettingExt } from '@src/pages/Lessons/model/types';
import { resetDomain, saveSettingsInitialData } from '@src/pages/Lessons/model';

import { getActivityRowInfoByItemIdQuery, getSettingsInfoQuery } from './queries';

connectGetActionNodes<GetSettingsInitDataParams, LessonSettingExt | null>({
  nodes: saveSettingsInitialData,
  handler: async ({ lessonId, settingId }) => {
    let resp = await resolved(() => getActivityRowInfoByItemIdQuery(lessonId), { noCache: true });
    if (settingId) resp = await resolved(() => getSettingsInfoQuery(settingId, resp), { noCache: true });
    return resp;
  },
  resetOn: [resetDomain],
});
