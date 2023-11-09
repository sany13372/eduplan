import { createDomain } from 'effector';
import { status } from 'patronum';
import { EduGroupListInfo, GetEduGroupListParams, GroupInfo } from '@src/pages/GroupList/model/types';
import { defaultEduGroupListInfo } from '@src/pages/GroupList/model/constants';
import { createDeleteActionNodes } from '@utils/effector';

export const GroupListDomain = createDomain('GroupList');
export const resetDomain = GroupListDomain.createEvent();

export const $groupListInfo = GroupListDomain.createStore<EduGroupListInfo>(defaultEduGroupListInfo);

export const getGroupList = GroupListDomain.createEvent<GetEduGroupListParams>();
export const getGroupListFx = GroupListDomain.createEffect<GetEduGroupListParams, EduGroupListInfo>();
export const $getGroupListStatus = status({ effect: getGroupListFx, defaultValue: 'pending' });

export const deleteGroup = createDeleteActionNodes<GroupInfo>(GroupListDomain);
