import { connectUpdateActionNodes } from '@utils/effector';
import { activityTopicNodesStore, updatePriorityTopicItem } from '@src/pages/ActivityTopics/model';
import { resolved } from '@src/gql-client';
import { convertCreateUpdateError } from '@src/pages/ActivityTopics/model/validation';
import { sample } from 'effector';

import { switchActivityRowsPriorityMutation } from './queries/switchActivityRowsPriorityMutation';

connectUpdateActionNodes({
  nodes: updatePriorityTopicItem,
  // @ts-ignore
  handler: async (priorityTopicItem) => {
    const data = await resolved(() => switchActivityRowsPriorityMutation(priorityTopicItem),{ noCache: true });
    return  data
  },
  resetOn: [updatePriorityTopicItem.reset],
  convertErrors: convertCreateUpdateError,
  showSuccessToast:false
});

sample({
  clock: updatePriorityTopicItem.updateFx.done,
  fn: ({params}) => params.eduPlanRowId,
  target: activityTopicNodesStore.get,
});