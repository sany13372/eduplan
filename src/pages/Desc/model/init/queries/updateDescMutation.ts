import { EduPlanDesc } from '@src/pages/Desc/model/types';
import { mutation } from '@src/gql-client';

export const updateDescMutation = async (data: EduPlanDesc): Promise<string> => {
  const b2cPriorityValue = Number.parseInt(data.b2c?.priority ?? '', 10);
  const b2bPriorityValue = Number.parseInt(data.b2b?.priority ?? '', 10);
  const resp = mutation.setEduPlanCard({
    eduPlanCard: {
      eduPlanId: data.id,
      b2bCost: data.b2b?.price?.trim(),
      b2bDescription: data.b2b?.description?.trim(),
      b2bIsPublic: Boolean(data.b2b?.isPubl),
      b2bParticipant: data.b2b?.target?.trim(),
      b2bPriority: !Number.isNaN(b2bPriorityValue) ? b2bPriorityValue : null,
      b2bResult: data.b2b?.result?.trim(),
      b2cCost: data.b2c?.price?.trim(),
      b2cDescription: data.b2c?.description?.trim(),
      b2cIsPublic: Boolean(data.b2c?.isPubl),
      b2cParticipant: data.b2c?.target?.trim(),
      b2cPriority: !Number.isNaN(b2cPriorityValue) ? b2cPriorityValue : null,
      b2cResult: data.b2c?.result?.trim(),
      b2cSite: data.b2c?.url?.trim(),
      b2bLandingUrl: data.b2b?.landing?.trim(),
      b2cLandingUrl: data.b2c?.landing?.trim(),
    },
  });

  return resp?.id ?? '';
};
