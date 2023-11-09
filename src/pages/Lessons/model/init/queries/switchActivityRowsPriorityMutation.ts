import { mutation } from '@src/gql-client';

type LessonPriorityType = {
  firstId:string
  secondId:string
};

export const switchActivityRowsPriorityMutation = (lessonPriority:LessonPriorityType) => {
  const activityRowsPair = mutation.switchActivityRowsPriority({
    activityRowsPair:{
      firstId:lessonPriority.firstId,
      secondId:lessonPriority.secondId
    }
  })
  return activityRowsPair?.switched
}