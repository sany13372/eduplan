import { GetPersonalLinkParams } from '@src/pages/Events/model/types';
import { query, StringOperationEnum } from '@src/gql-client';

export const getPersonalLink = ({ eventId }: GetPersonalLinkParams): string | undefined => {
  const resp = query.getEduPlanParticipantPersonalLinks({
    filter: {
      eventId: {
        operator: StringOperationEnum.EQUALS,
        value: eventId,
      },
    },
  });
  return resp?.[0]?.link ?? undefined;
};
