import { mutation } from '@src/gql-client';

type PriorityTopicItemType = {
  firstId:string
  secondId:string
};

export const switchActivityRowsPriorityMutation = (priorityTopicItem:PriorityTopicItemType) => {
  const activityRowsPair = mutation.switchActivityRowsPriority({
    activityRowsPair:{
      firstId:priorityTopicItem.firstId,
      secondId:priorityTopicItem.secondId
    }
  })
  return activityRowsPair?.switched
}