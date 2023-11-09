import { query } from '@src/gql-client';
import { CompetitionPeriod } from '@src/pages/EduPlans/model/types';

const eduProgIdCriteria = (eduProgId?: string) =>
  eduProgId
    ? {
        space: {
          eduPrograms: {
            id: {
              _eq: eduProgId,
            },
          },
        },
      }
    : {};
export const getCompetitionPeriodListQuery = (eduProgId?: string): CompetitionPeriod[] => {
  const resp = query.readCompletionPeriodSettings({
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
        eduProgIdCriteria(eduProgId),
      ],
    },
  });
  const completitionPeriodList: CompetitionPeriod[] = resp
    .map(({ completionPeriod }) => ({
      id: completionPeriod?.id ?? '',
      caption: completionPeriod?.title ?? '',
    }))
    .filter((e) => e.id);

  return completitionPeriodList.sort((a, b) => {
    if (a.caption > b.caption) return 1;
    if (a.caption < b.caption) return -1;
    return 0;
  });
};
