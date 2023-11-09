import { connectGetActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import {
  $pageParams,
  createStudentInfo,
  deleteStudent,
  excludeStudent,
  groupStudents,
  groupStudentsInitial,
  resetDomain,
  updateStudentInfo,
} from '@src/pages/GroupManagement/model';
import { GetStudentsInfoParams, GroupStudentsInfo } from '@src/pages/GroupManagement/model/types';
import { sample } from 'effector';
import { defaultGroupStudentsInfo } from '@src/pages/GroupManagement/model/constants';

import { getStudentsQuery } from './queries/getStudentsQuery';

const effectHandler = async (params: GetStudentsInfoParams): Promise<GroupStudentsInfo> => {
  const resp = await resolved(() => getStudentsQuery(params), { noCache: true });
  return {
    data: [...params.data.data, ...resp.students],
    pagination: {
      pageSize: params.data.pagination.pageSize,
      count: resp.count,
      pageIndex: params.data.pagination.pageIndex + 1,
    },
  };
};
connectGetActionNodes({
  nodes: groupStudents,
  handler: effectHandler,
  resetOn: [resetDomain],
});

connectGetActionNodes({
  nodes: groupStudentsInitial,
  handler: effectHandler,
  resetOn: [resetDomain],
});

groupStudents.$value.on(groupStudentsInitial.getFx.doneData, (_, val) => val);

sample({
  clock: [
    createStudentInfo.addFx.doneData,
    deleteStudent.deleteFx.doneData,
    excludeStudent.deleteFx.doneData,
    updateStudentInfo.updateFx.doneData,
  ],
  source: $pageParams,
  fn: (pageParams): GetStudentsInfoParams => ({
    groupId: pageParams.groupId,
    data: defaultGroupStudentsInfo,
  }),
  target: groupStudentsInitial.getFx,
});
