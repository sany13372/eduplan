import { query } from '@src/gql-client';
import { EduTechnology } from '@src/pages/EduPlans/model/types';

export const getEduTechnologyListQuery = (eduProgId: string): EduTechnology[] => {
  const resp = query.readEduTechnologySettings({
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
  const eduTechnologyList: EduTechnology[] = resp
    .map(({ eduTechnology }) => ({
      id: eduTechnology?.id ?? '',
      caption: eduTechnology?.title ?? '',
      shortTitle: eduTechnology?.shortTitle ?? '',
    }))
    .filter((e) => e.id);

  return eduTechnologyList.sort((a, b) => {
    if (a.caption > b.caption) return 1;
    if (a.caption < b.caption) return -1;
    return 0;
  });
};
