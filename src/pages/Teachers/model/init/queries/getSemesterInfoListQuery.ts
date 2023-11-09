import { SemesterInfo } from '@src/pages/Teachers/model/types';
import { query } from '@src/gql-client';
import { parseSemesterInfo } from '@src/pages/Teachers/model/mappers';

export const getSemesterInfoListQuery = async (eduPlanId: string): Promise<SemesterInfo[]> => {
  const resp = query.getEduPlanEmployeeActivities({
    eduPlanId,
  });
  return resp?.map(parseSemesterInfo) ?? [];
};
