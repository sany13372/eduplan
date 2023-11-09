import { query } from '@src/gql-client';
import { EduGridElement } from '@src/pages/ActivityList/model/types';
import sortBy from 'lodash/sortBy';

export const getEduGridElementListQuery = (
  eduProgId: string,
  eduGridId: string,
  eduPlanId: string,
): EduGridElement[] => {
  const resp = query.readEduGridElementItems({
    where: {
      eduPlanId: { _eq: eduPlanId },
      deletedAt: { _is_null: true },
    },
  });

  const eduGridElementList: EduGridElement[] = resp.map(({ id, eduGridElementSetting }) => {
    return {
      id: id ?? '',
      caption: eduGridElementSetting?.eduGridElement?.title ?? '',
      gridId: eduGridElementSetting?.eduGridElement?.gridId ?? '',
      priority: eduGridElementSetting?.eduGridElement?.priority ?? '',
    };
  });

  return sortBy(eduGridElementList, 'priority');
};
