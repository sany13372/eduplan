import { Maybe, order_by, query, Student_bool_exp } from '@src/gql-client';
import { GroupStudentsInfo, ShortUserInfo } from '@src/pages/StudentGroupList/model/types';
import { studentToShortUserInfo } from '@src/pages/StudentGroupList/model/mappers';
import { PaginationInfo } from '@src/types';

const getQueryParams = (eduPlanId: string, groupId?: string): Maybe<Student_bool_exp> => {
  return {
    personRole: {
      deleted_at: { _is_null: true },
    },
    eduPlanId: { _eq: eduPlanId },
    groupId: groupId ? { _eq: groupId } : { _is_null: true },
  };
};
export const getStudentsInfoNewQuery = (
  eduPlanId: string,
  { pageIndex, pageSize }: PaginationInfo,
  groupId?: string,
): GroupStudentsInfo => {
  const params = getQueryParams(eduPlanId, groupId);
  const resp = query.readStudents({
    where: params,
    limit: pageSize,
    offset: pageSize * pageIndex,
    order_by: [{ bookNumber: order_by.desc_nulls_first }, { id: order_by.asc }], // TODO: заменить на сортировку по фио когда она будет доступна
  });
  const respAggregate = query.readStudentsAggregate({ where: params });
  const studentInfoList: ShortUserInfo[] = resp.map(studentToShortUserInfo);

  return {
    students: studentInfoList,
    pagination: { count: respAggregate.aggregate?.count() ?? 0, pageIndex: pageIndex + 1, pageSize },
  };
};
