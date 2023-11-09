import { order_by, query } from '@src/gql-client';
import { castNotSkeletonDeep } from 'gqty';
import { GetStudentListParams, StudentInfo, StudentListInfo } from '@src/pages/Lessons/model/types';

type QueryArgsType = Parameters<typeof query.readStudents>[0];

const toQueryArgs = (params: GetStudentListParams): QueryArgsType => {
  const { activityRowId, implId } = params;
  const studentRelationsCriteria = implId
    ? {
        lessonImplementationId: { _eq: implId },
        deletedAt: { _is_null: true },
      }
    : undefined;

  const studentTrajectoriesCriteria = !implId
    ? {
        trajectoryRows: {
          eduPlanRow: {
            eduPlanActivityRows: {
              id: { _in: [activityRowId] },
            },
          },
        },
      }
    : undefined;
  return {
    where: {
      personRole: { deleted_at: { _is_null: true } },
      lesson2StudentRelations: studentRelationsCriteria,
      studentTrajectories: studentTrajectoriesCriteria,
    },
    order_by: [{ student_group: { id: order_by.asc } }],
  };
};

const getStudentListItemCount = (queryArgs: QueryArgsType) => {
  const { aggregate } = castNotSkeletonDeep(query.readStudentsAggregate(queryArgs));
  return aggregate?.count() || 0;
};

const getStudentListItems = (queryArgs: QueryArgsType): StudentInfo[] => {
  const resp = query.readStudents(queryArgs);

  return resp.map(({ id, financingSource, course_setting, student_group, bookNumber, personalNumber, personRole }) => {
    const person = Array.isArray(personRole.person) && personRole.person.length > 0 ? personRole.person[0] : undefined;
    return {
      id: id ?? '',
      financingSource: financingSource?.title ?? '',
      course: course_setting?.course?.title ?? '',
      group: student_group?.title ?? '',
      bookNumber: bookNumber ?? '',
      personalNumber: personalNumber ?? '',
      fio: `${person?.identityCard?.lastName ?? ''} ${person?.identityCard?.firstName ?? ''} ${
        person?.identityCard?.middleName ?? ''
      }`,
      email: person?.user?.email ?? '',
    };
  });
};

export const getStudentListQuery = (params: GetStudentListParams): StudentListInfo => {
  const { state } = params;
  const queryArgs = toQueryArgs(params);

  const totalItemCount = getStudentListItemCount(queryArgs);

  const items = getStudentListItems({
    ...queryArgs,
    offset: state.pageIndex * state.pageSize,
    limit: state.pageSize,
  });

  return { totalItemCount, items };
};
