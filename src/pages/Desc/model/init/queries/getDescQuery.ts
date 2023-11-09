import { EduPlanDesc } from '@src/pages/Desc/model/types';
import { query } from '@src/gql-client';

export const getDescQuery = async (eduPlanId: string): Promise<EduPlanDesc> => {
  const resp = query.getEduPlanCard({ eduPlanId });

  return {
    id: eduPlanId,
    b2b:
      resp !== null
        ? {
            isPubl: resp?.b2bIsPublic ?? false,
            priority: `${resp.b2bPriority ?? ''}`,
            url: '',
            price: resp?.b2bCost ?? '',
            result: resp?.b2bResult ?? '',
            target: resp?.b2bParticipant ?? '',
            description: resp?.b2bDescription ?? '',
            landing: resp?.b2bLandingUrl ?? '',
          }
        : undefined,
    b2c:
      resp !== null
        ? {
            isPubl: resp?.b2cIsPublic ?? false,
            priority: `${resp.b2cPriority ?? ''}`,
            url: resp?.b2cSite ?? '',
            price: resp?.b2cCost ?? '',
            result: resp?.b2cResult ?? '',
            target: resp?.b2cParticipant ?? '',
            description: resp?.b2cDescription ?? '',
            landing: resp?.b2cLandingUrl ?? '',
          }
        : undefined,
  };
};
