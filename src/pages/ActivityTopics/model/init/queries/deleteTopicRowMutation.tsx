import { TopicRow } from '@src/pages/ActivityTopics/model/types';
import { mutation } from '@src/gql-client';

export const deleteTopicRowMutation = (val: TopicRow): string => {
  const resp = mutation.removeEduPlanActivityRow({ id: val.id });
  return resp?.id ?? '';
};
