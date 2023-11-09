import { query } from '@src/gql-client';
import { Reference } from '@src/types';

export const getPeriodKindsQuery = (): Reference[] => {
  const resp = query.getAllEduPlanPeriodKinds ?? [];
  return resp?.map((e) => ({ id: e?.id ?? '', caption: e?.title ?? '' }));
};
