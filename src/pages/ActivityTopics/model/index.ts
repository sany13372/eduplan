import { createDomain } from 'effector';
import {
  createReferenceListNodes,
  createGetActionNodes,
  createAddActionNodes,
  createUpdateActionNodes,
  createDeleteActionNodes,
} from '@utils/effector';

import {
  TopicNode,
  WorkKind,
  EffortUnit,
  AddTopicGroup,
  UpdateTopicGroup,
  AddTopicItem,
  UpdateTopicItem,
  TopicItem,
  TopicGroup,
  TopicRow,
  PriorityTopicItem,
} from './types';

export const ActivityTopicList = createDomain('ActivityTopicList');

export const grouppedLessonKindsStore = createGetActionNodes<string, WorkKind[]>(ActivityTopicList, []);
export const activityTopicNodesStore = createGetActionNodes<string, TopicNode[]>(ActivityTopicList, []);
export const effortUnitStore = createGetActionNodes<string, EffortUnit>(ActivityTopicList, {
  unit: 'hours_and_minutes',
});

export const resetActivityTopicList = ActivityTopicList.createEvent();

export const componentKindsStore = createReferenceListNodes<string>(ActivityTopicList);
export const partTypesStore = createReferenceListNodes<string>(ActivityTopicList);
export const topicGroupsStore = createReferenceListNodes<string>(ActivityTopicList);

export type UpdateGroupOrItem =
  | { type: 'item'; value: Omit<UpdateTopicItem, 'eduPlanRowId'> }
  | { type: 'group'; value: UpdateTopicGroup };

export const selectedTopicGroupOrItemStore = createGetActionNodes<string, UpdateGroupOrItem | null>(
  ActivityTopicList,
  null,
);

export const addTopicGroup = createAddActionNodes<AddTopicGroup>(ActivityTopicList);
export const updateTopicGroup = createUpdateActionNodes<TopicGroup>(ActivityTopicList);

export const addTopicItem = createAddActionNodes<AddTopicItem>(ActivityTopicList);
export const updateTopicItem = createUpdateActionNodes<TopicItem>(ActivityTopicList);
export const updatePriorityTopicItem = createUpdateActionNodes<PriorityTopicItem>(ActivityTopicList);

export const deleteTopicRow = createDeleteActionNodes<TopicRow>(ActivityTopicList);
