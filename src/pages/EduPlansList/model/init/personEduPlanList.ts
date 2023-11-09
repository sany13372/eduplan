import { connectGetActionNodes } from '@utils/effector';
import { resetDomain } from '@src/pages/LessonSettings/model';
import { personEduPlanList } from '@src/pages/EduPlansList/model';
import { resolved } from '@src/gql-client';
import { getPersonEduPlanListQuery } from '@src/pages/EduPlansList/model/init/queries';

connectGetActionNodes({
  nodes: personEduPlanList,
  handler: async () => resolved(() => getPersonEduPlanListQuery(), { noCache: true }),
  resetOn: [resetDomain],
});
