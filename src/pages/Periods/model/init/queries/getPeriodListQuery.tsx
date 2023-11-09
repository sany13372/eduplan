import { Period } from '@src/pages/Periods/model/types';
import { query } from '@src/gql-client';
import { mapRawPeriodInfoToPeriod } from '@src/pages/Periods/model/mappers';
import partialRight from 'lodash/partialRight';

export const getPeriodListQuery = (id: string): Period[] => {
  const mapRawPeriodInfoToPeriodPartial = partialRight(mapRawPeriodInfoToPeriod, id);
  const resp = query.getEduPlanGridElementPeriods({
    eduGridItemId: id,
  });
  const periodsRaw = resp?.periods ?? [];
  return periodsRaw.map(mapRawPeriodInfoToPeriodPartial);
};
