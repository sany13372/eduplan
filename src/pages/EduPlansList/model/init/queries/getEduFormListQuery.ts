import { query } from '@src/gql-client';
import { EduForm } from '@src/pages/EduPlansList/model/types';
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

export const getEduFormListQuery = (eduProgId?: string): EduForm[] => {
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
        eduProgIdCriteria(eduProgId),
      ],
    },
  });
  const eduFormList: EduForm[] = resp
    .map(({ eduForm }) => ({
      id: eduForm?.id ?? '',
      caption: eduForm?.title ?? '',
    }))
    .filter((e) => e.id);

  return sortBy(uniqBy(eduFormList, 'id'), 'caption');
};
