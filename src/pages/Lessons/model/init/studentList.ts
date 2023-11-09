import { resetDomain } from '@src/pages/GroupList/model';
import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';
import { studentListInfo } from '@src/pages/Lessons/model';
import { GetStudentListParams, StudentListInfo } from '@src/pages/Lessons/model/types';

import { getStudentListQuery } from './queries';

connectGetActionNodes<GetStudentListParams, StudentListInfo>({
  nodes: studentListInfo,
  handler: async (params) => resolved(() => getStudentListQuery(params), { noCache: true }),
  resetOn: [resetDomain],
});
