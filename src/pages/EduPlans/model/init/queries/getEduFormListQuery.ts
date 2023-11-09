import { query } from '@src/gql-client';
import { EduForm } from '@src/pages/EduPlans/model/types';

export const getEduFormListQuery = (eduProgId: string): EduForm[] => {
  const resp = query.readEduFormSettings({
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
  const eduFormList: EduForm[] = resp
    .map(({ eduForm }) => ({
      id: eduForm?.id ?? '',
      caption: eduForm?.title ?? '',
      shortTitle: eduForm?.shortTitle ?? '',
    }))
    .filter((e) => e.id);

  return eduFormList.sort((a, b) => {
    if (a.caption > b.caption) return 1;
    if (a.caption < b.caption) return -1;
    return 0;
  });
};
