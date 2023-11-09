import { query } from '@src/gql-client';
import { EduTechnology } from '@src/pages/EduPlansList/model/types';
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
export const getEduTechnologyListQuery = (eduProgId?: string): EduTechnology[] => {
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
        eduProgIdCriteria(eduProgId),
      ],
    },
  });
  const eduTechnologyList: EduTechnology[] = resp
    .map(({ eduTechnology }) => ({
      id: eduTechnology?.id ?? '',
      caption: eduTechnology?.title ?? '',
    }))
    .filter((e) => e.id);

  return sortBy(uniqBy(eduTechnologyList, 'id'), 'caption');
};
