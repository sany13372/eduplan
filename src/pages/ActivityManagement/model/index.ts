import { createDomain } from 'effector';
import { status } from 'patronum';
import { ValidationErrors } from '@utils/validation';
import { createDeleteActionNodes, createGetActionNodes } from '@utils/effector';

import { Category, ComponentKind, ShortActivityGroupInfo, ShortActivityInfo, ViewActivityInfo } from './types';

export const ActivityManagementDomain = createDomain('ActivityManagementDomain');
export const resetDomainData = ActivityManagementDomain.createEvent();

export const $categoryList = ActivityManagementDomain.createStore<Category[]>([]);
export const getCategoryList = ActivityManagementDomain.createEvent<string>();
export const getCategoryListFx = ActivityManagementDomain.createEffect<string, Category[]>();
export const $getCategoryListStatus = status({ effect: getCategoryListFx, defaultValue: 'pending' });

export const $createdId = ActivityManagementDomain.createStore<string>('');
export const $createActivityErrors = ActivityManagementDomain.createStore<ValidationErrors>({});
export const resetCreateActivityErrors = ActivityManagementDomain.createEvent();
export const resetCreateActivityInfo = ActivityManagementDomain.createEvent();
export const createActivity = ActivityManagementDomain.createEvent<ShortActivityInfo>();
export const createActivityFx = ActivityManagementDomain.createEffect<ShortActivityInfo, string>();
export const $createActivityStatus = status({ effect: createActivityFx });

export const $componentKindList = ActivityManagementDomain.createStore<ComponentKind[]>([]);
export const getComponentKindList = ActivityManagementDomain.createEvent<string>();
export const getComponentKindListFx = ActivityManagementDomain.createEffect<string, ComponentKind[]>();
export const $getComponentKindListStatus = status({ effect: getComponentKindListFx, defaultValue: 'pending' });

export const $createdGroupId = ActivityManagementDomain.createStore<string>('');
export const $createGroupActivityErrors = ActivityManagementDomain.createStore<ValidationErrors>({});
export const resetCreateGroupActivityErrors = ActivityManagementDomain.createEvent();
export const resetCreateGroupActivityInfo = ActivityManagementDomain.createEvent();
export const createGroupActivity = ActivityManagementDomain.createEvent<ShortActivityGroupInfo>();
export const createGroupActivityFx = ActivityManagementDomain.createEffect<ShortActivityGroupInfo, string>();
export const $createActivityGroupStatus = status({ effect: createGroupActivityFx });

export const $updatedItem = ActivityManagementDomain.createStore<ShortActivityInfo | null>(null);
export const $updatedItemNotFound = ActivityManagementDomain.createStore<boolean>(false);
export const getUpdatedItem = ActivityManagementDomain.createEvent<string>();
export const getUpdatedItemFx = ActivityManagementDomain.createEffect<string, ShortActivityInfo | null>();
export const $getUpdatedItemStatus = status({ effect: getUpdatedItemFx, defaultValue: 'pending' });

export const $updatedId = ActivityManagementDomain.createStore<string>('');
export const $updateActivityErrors = ActivityManagementDomain.createStore<ValidationErrors>({});
export const resetUpdateActivityErrors = ActivityManagementDomain.createEvent();
export const resetUpdateActivityInfo = ActivityManagementDomain.createEvent();
export const updateActivity = ActivityManagementDomain.createEvent<ShortActivityInfo>();
export const updateActivityFx = ActivityManagementDomain.createEffect<ShortActivityInfo, string>();
export const $updateActivityStatus = status({ effect: updateActivityFx });

export const $updatedGroupItem = ActivityManagementDomain.createStore<ShortActivityGroupInfo | null>(null);
export const $updatedGroupItemNotFound = ActivityManagementDomain.createStore<boolean>(false);
export const getUpdatedGroupItem = ActivityManagementDomain.createEvent<string>();
export const getUpdatedGroupItemFx = ActivityManagementDomain.createEffect<string, ShortActivityGroupInfo | null>();
export const $getUpdatedGroupItemStatus = status({ effect: getUpdatedGroupItemFx, defaultValue: 'pending' });

export const $updatedGroupId = ActivityManagementDomain.createStore<string>('');
export const $updateGroupActivityErrors = ActivityManagementDomain.createStore<ValidationErrors>({});
export const resetUpdateGroupActivityErrors = ActivityManagementDomain.createEvent();
export const resetUpdateGroupActivityInfo = ActivityManagementDomain.createEvent();
export const updateGroupActivity = ActivityManagementDomain.createEvent<ShortActivityGroupInfo>();
export const updateGroupActivityFx = ActivityManagementDomain.createEffect<ShortActivityGroupInfo, string>();
export const $updateGroupActivityStatus = status({ effect: updateGroupActivityFx });

export const $eduProgramId = ActivityManagementDomain.createStore<string>('');
export const getEduProgramId = ActivityManagementDomain.createEvent<string>();
export const getEduProgramIdFx = ActivityManagementDomain.createEffect<string, string>();
export const $getEduProgramId = status({ effect: getEduProgramIdFx, defaultValue: 'pending' });

export const activityInfo = createGetActionNodes<string, ViewActivityInfo | null>(ActivityManagementDomain, null);

export const deleteRow = createDeleteActionNodes<{ id: string }>(ActivityManagementDomain);
