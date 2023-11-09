import { connectGetActionNodes } from '@utils/effector';
import { eduPlanRowData, resetDomain, resetEduPlanRowData } from '@src/pages/Lessons/model';
import { EduPlanRowShortInfo } from '@src/pages/Lessons/model/types';
import { resolved } from '@src/gql-client';
import { getActivityRowShortInfoQuery } from '@src/pages/Lessons/model/init/queries';

connectGetActionNodes<string, EduPlanRowShortInfo | null>({
  nodes: eduPlanRowData,
  handler: async (activityRowId) => resolved(() => getActivityRowShortInfoQuery(activityRowId), { noCache: true }),
  resetOn: [resetDomain, resetEduPlanRowData],
});
