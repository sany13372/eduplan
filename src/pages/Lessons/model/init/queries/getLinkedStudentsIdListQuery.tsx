import { query } from '@src/gql-client';
import { castNotSkeletonDeep } from 'gqty';

export const getLinkedStudentsIdListQuery = (implId: string): string[] => {
  const resp = query.readStudents({
    where: {
      lesson2StudentRelations: {
        lessonImplementationId: { _eq: implId },
      },
      personRole: { deleted_at: { _is_null: true } },
    },
  });
  return castNotSkeletonDeep(resp).map((e) => e.id);
};
