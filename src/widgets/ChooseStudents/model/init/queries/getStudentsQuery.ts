import { order_by, query, Student_bool_exp } from '@src/gql-client';
import { GetStudentsParams } from '@src/widgets/ChooseStudents/model/types';
import { StudentInfo } from '@src/types';
import { studentToStudentInfo } from '@src/widgets/ChooseStudents/model/mappers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getArgs = (planId: string, filter: string): Student_bool_exp => {
  return {
    personRole: {
      deleted_at: { _is_null: true },
    },
    groupId: { _is_null: true },
    eduPlanId: { _eq: planId },
  };
};
export const getStudentsQuery = ({
  baseInfo: { planId },
  data: {
    pagination: { pageSize, pageIndex },
  },
  filter,
}: GetStudentsParams): { students: StudentInfo[]; count: number } => {
  const args = getArgs(planId, filter);
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
