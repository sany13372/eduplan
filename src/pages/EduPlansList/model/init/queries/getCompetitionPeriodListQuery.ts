import { query } from '@src/gql-client';
import { CompetitionPeriod } from '@src/pages/EduPlansList/model/types';
import sortBy from 'lodash/sortBy';
import { uniqBy } from 'lodash';

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

  return sortBy(uniqBy(completitionPeriodList, 'id'), 'caption');
};
