import { order_by, query, Student_bool_exp } from '@src/gql-client';
import { PaginationInfo } from '@src/types';
import { FilterObjNew, StudentsListInfo } from '@src/pages/IotManagement/model/types';
import { castNotSkeletonDeep } from 'gqty';
import { defaultGroupObj, emptyGroupObj } from '@src/pages/IotManagement/model/constants';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getArgs = (planId: string, filters: FilterObjNew): Student_bool_exp => {
  let groupFilter;
  if (filters.group.id === emptyGroupObj.id) groupFilter = { _is_null: true };
  if (filters.group.id !== emptyGroupObj.id && filters.group.id !== defaultGroupObj.id)
    groupFilter = { _eq: filters.group.id };
  return {
    personRole: {
      deleted_at: { _is_null: true },
    },
    groupId: groupFilter,
    eduPlanId: { _eq: planId },
  };
};
export const getStudentsQuery = ({
  paginationData: { pageSize, pageIndex },
  planId,
  filters,
}: {
  filters: FilterObjNew;
  planId: string;
  paginationData: PaginationInfo;
}): StudentsListInfo => {
  const args = getArgs(planId, filters);
  const resp = query.readStudents({
    where: args,
    limit: pageSize,
    offset: pageSize * pageIndex,
    order_by: [{ groupId: order_by.asc_nulls_last }, { id: order_by.asc }],
  });
  const respAggregate = query.readStudentsAggregate({
    where: args,
  });

  return {
    data: resp.map(castNotSkeletonDeep).map(({ id, student_group, studentTrajectories, personRole }) => {
      const person =
        Array.isArray(personRole.person) && personRole.person.length > 0 ? personRole.person[0] : undefined;
      const fullName = `${person?.identityCard?.lastName ?? ''} ${person?.identityCard?.firstName ?? ''} ${
        person?.identityCard?.middleName ?? ''
      }`;

      return {
        eduGridElementId: '',
        isSelected: {},
        studentInfo: {
          id,
          fullName,
        },
        groupInfo: {
          id: student_group?.id ?? '',
          caption: student_group?.title ?? '',
        },
        trajectoryList: studentTrajectories()
          .filter((trajectory) => !trajectory.deletedAt)
          .map((trajectory) => ({
            id: trajectory.id,
            gridElementId: trajectory.eduGridItemId,
            rows: trajectory.trajectoryRows().map((el) => ({
              id: el.id,
              activityId: el?.eduPlanRow?.id ?? '',
            })),
          })),
      };
    }),
    pagination: { count: respAggregate.aggregate?.count() ?? 0, pageIndex: pageIndex + 1, pageSize },
  };
};
