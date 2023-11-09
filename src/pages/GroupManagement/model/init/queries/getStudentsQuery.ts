import { order_by, query, Student_bool_exp } from '@src/gql-client';
import { GetStudentsInfoParams, StudentInfo } from '@src/pages/GroupManagement/model/types';
import { studentToStudentInfo } from '@src/pages/GroupManagement/model/mappers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getArgs = (groupId: string): Student_bool_exp => {
  return {
    personRole: {
      deleted_at: { _is_null: true },
    },
    groupId: { _eq: groupId },
  };
};
export const getStudentsQuery = ({
  groupId,
  data: {
    pagination: { pageSize, pageIndex },
  },
}: GetStudentsInfoParams): { students: StudentInfo[]; count: number } => {
  const args = getArgs(groupId);
  const resp = query.readStudents({
    where: args,
    limit: pageSize,
    offset: pageSize * pageIndex,
    order_by: [{ id: order_by.asc }, { groupId: order_by.desc_nulls_first }],
  });
  const respAggregate = query.readStudentsAggregate({
    where: args,
  });

  return {
    students: resp.map(studentToStudentInfo),
    count: respAggregate.aggregate?.count() ?? 0,
  };
};
