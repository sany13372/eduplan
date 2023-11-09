import { query } from '@src/gql-client';
import { castNotSkeletonDeep } from 'gqty';
import { StudentTrajectory } from '@src/pages/IotManagement/model/types';

export const getStudentTrajectoryListQuery = (eduPlanId: string): StudentTrajectory[] => {
  const resp = query.readStudents({
    where: {
      eduPlanId: { _eq: eduPlanId },
      personRole: { deleted_at: { _is_null: true } },
      _or: [{ archived: { _is_null: true } }, { archived: { _eq: false } }],
    },
  });

  if (!resp) throw new Error('Не удалось найти запрашиваемый элемент');

  return resp.map(castNotSkeletonDeep).map(({ id, student_group, studentTrajectories, personRole }) => {
    const person = Array.isArray(personRole.person) && personRole.person.length > 0 ? personRole.person[0] : undefined;
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
  });
};
