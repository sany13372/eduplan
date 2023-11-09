import { query } from '@src/gql-client';
import { EduPlanShortInfo } from '@src/pages/EduPlansList/model/types';
import { eduPlanTypeToEduPlanShortInfo } from '@src/pages/EduPlansList/model/mappers';
import { isNotEmpty } from '@utils/typescriptUtils';

export const getPersonEduPlanListQuery = async (): Promise<EduPlanShortInfo[]> => {
  const resp = query.getEduProgramAdminPlans ?? [];
  return resp.filter(isNotEmpty).map(eduPlanTypeToEduPlanShortInfo);
};
