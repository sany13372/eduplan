import { query } from '@src/gql-client';
import { Reference } from '@src/types';
import { isNotEmpty } from '@utils/typescriptUtils';
import { employeeTypeToReference } from '@src/pages/EduPlans/model/mappers';

export const getEduPlanAdminsQuery = (planId: string, pageSize: number): Reference[] => {
  const resp = query.getEduProgramAdmins({
    planId,
    pageSize,
    pageIndex: 0,
  });
  return resp?.entities?.filter(isNotEmpty).map(employeeTypeToReference) ?? [];
};
