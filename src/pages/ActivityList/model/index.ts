import { createDomain } from 'effector';
import { status } from 'patronum';
import { createGetActionNodes } from '@src/utils/effector';

import { EduGridElement, EduGridItem, EffortUnit, WorkKind } from './types';

export const ActivityListDomain = createDomain('ActivityListDomain');
export const resetDomainData = ActivityListDomain.createEvent();

export const $eduGridElementList = ActivityListDomain.createStore<EduGridElement[]>([]);
export const getEduGridElementList =
  ActivityListDomain.createEvent<{ eduProgId: string; eduGridId: string; eduPlanId: string }>();
export const getEduGridElementListFx = ActivityListDomain.createEffect<
  { eduProgId: string; eduGridId: string; eduPlanId: string },
  EduGridElement[]
>();
export const $eduGridElementStatus = status({ effect: getEduGridElementListFx, defaultValue: 'pending' });

export const $eduPlanActivityList = ActivityListDomain.createStore<EduGridItem[]>([]);
export const getEduPlanActivityList =
  ActivityListDomain.createEvent<{ eduProgId: string; eduGridId: string; eduPlanId: string }>();
export const getEduPlanActivityListFx = ActivityListDomain.createEffect<
  { eduProgId: string; eduGridId: string; eduPlanId: string },
  EduGridItem[]
>();
export const $eduPlanActivityStatus = status({ effect: getEduPlanActivityListFx, defaultValue: 'pending' });

export const $deleteEduPlanRow = ActivityListDomain.createStore<EduGridItem | null>(null);
export const setDeleteEduPlanRow = ActivityListDomain.createEvent<EduGridItem | null>();
export const resetDeleteEduPlanRow = ActivityListDomain.createEvent();
export const deleteEduPlanRow = ActivityListDomain.createEvent<EduGridItem>();
export const deleteEduPlanRowFx = ActivityListDomain.createEffect<EduGridItem, EduGridItem>();
export const $deleteEduPlanRowError = ActivityListDomain.createStore<string>('');
export const dismissDeleteEduPlanRowError = ActivityListDomain.createEvent();

export const grouppedLessonKindsStore = createGetActionNodes<string, WorkKind[]>(ActivityListDomain, []);

export const effortUnitStore = createGetActionNodes<string, EffortUnit>(ActivityListDomain, {
  unit: 'hours_and_minutes',
});

export const $selectedEduGridElement = ActivityListDomain.createStore<{ id: string; title: string } | null>(null);
export const setItemId = ActivityListDomain.createEvent<{ id: string; title: string } | null>();
export const resetItemId = ActivityListDomain.createEvent();
