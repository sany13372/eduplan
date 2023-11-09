import { resetDomain } from '@src/pages/GroupList/model';
import { resolved } from '@src/gql-client';
import { connectGetActionNodes } from '@utils/effector';
import { deleteStudent, studentListInfo } from '@src/pages/StudentList/model';
import { GetStudentListParams, StudentListInfo } from '@src/pages/StudentList/model/types';
import { getStudentListQuery } from '@src/pages/StudentList/model/init/queries';

connectGetActionNodes<GetStudentListParams, StudentListInfo>({
  nodes: studentListInfo,
  handler: async (params) => resolved(() => getStudentListQuery(params), { noCache: true }),
  resetOn: [resetDomain],
});

studentListInfo.$value.on(deleteStudent.deleteFx.done, (state, req) => {
  const items = state.items.filter((e) => e.id !== req.params.id);
  return { items, totalItemCount: items.length };
});
