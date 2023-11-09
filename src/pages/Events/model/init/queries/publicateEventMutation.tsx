import { PublicateEventParams } from '@src/pages/Events/model/types';
import { mutation } from '@src/gql-client';

export const publicateEventMutation = (params: PublicateEventParams) => {
  const resp = mutation.publishEduPlanWebinar({
    WebinarPublishDTO: {
      id: params.id,
      isPublished: params.isPublished,
    },
  });
  return Boolean(resp?.isPublished);
};
