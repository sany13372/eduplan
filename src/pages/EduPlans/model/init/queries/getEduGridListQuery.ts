import { query } from '@src/gql-client';
import { EduGrid } from '@src/pages/EduPlans/model/types';

export const getEduGridListQuery = (eduProgId: string): EduGrid[] => {
  const resp = query.readEduGridSettings({
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
              id: {
                _eq: eduProgId,
              },
            },
          },
        },
      ],
    },
  });
  const eduGridList: EduGrid[] = resp
    .map(({ eduGrid }) => ({
      id: eduGrid?.id ?? '',
      caption: eduGrid?.title ?? '',
      completionPeriodId: eduGrid?.completionPeriodId ?? '',
    }))
    .filter((e) => e.id);
  return eduGridList.sort((a, b) => {
    if (a.caption > b.caption) return 1;
    if (a.caption < b.caption) return -1;
    return 0;
  });
};
