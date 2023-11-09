import { query } from '@src/gql-client';
import { EduKind } from '@src/pages/Lessons/model/types';
import sortBy from 'lodash/sortBy';

export const getThemeLessonKindListQuery = (themeId: string): EduKind[] => {
  const resp = query.readThemeLessonKindSettings({
    where: {
      _and: [
        {
          _or: [
            {
              isDisabled: {
                _is_null: true,
              },
            },
            {
              isDisabled: {
                _eq: false,
              },
            },
          ],
        },
        {
          space: {
            eduPrograms: {
              eduPlans: {
                eduPlanRows: {
                  eduPlanActivityRows: {
                    id: { _eq: themeId },
                  },
                },
              },
            },
          },
        },
      ],
    },
  });
  const themeLessonKinds: EduKind[] = resp
    .map(({ themeLessonKind }) => ({
      id: themeLessonKind?.id ?? '',
      caption: themeLessonKind?.title ?? '',
    }))
    .filter((e) => e.id);

  return sortBy(themeLessonKinds, (e) => e.caption);
};
