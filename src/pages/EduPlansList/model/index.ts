import { createDomain } from 'effector';
import { status } from 'patronum';
import {
  CompetitionPeriod,
  EduForm,
  EduPlanListInfo,
  EduPlanListState,
  EduPlanShortInfo,
  EduStartDate,
  EduTechnology,
  EnrollmentYear,
  GetEduPlanListParams,
  OptionalVal,
} from '@src/pages/EduPlansList/model/types';
import { createGetActionNodes } from '@utils/effector';

import {
  defaultEduPlanListInfo,
  defaultEduPlanListState,
  defaultEduStartDateList,
  defaultEnrollmentYearList,
} from './constants';

export const EduPlanListDomain = createDomain('EduPlanListDomain');

export const $eduFormList = EduPlanListDomain.createStore<EduForm[]>([]);
export const getEduFormList = EduPlanListDomain.createEvent<OptionalVal<string>>();
export const getEduFormListFx = EduPlanListDomain.createEffect<OptionalVal<string>, EduForm[]>();
export const $eduFormListStatus = status({ effect: getEduFormListFx, defaultValue: 'pending' });

export const $eduTechnologyList = EduPlanListDomain.createStore<EduTechnology[]>([]);
export const getEduTechnologyList = EduPlanListDomain.createEvent<OptionalVal<string>>();
export const getEduTechnologyListFx = EduPlanListDomain.createEffect<OptionalVal<string>, EduTechnology[]>();
export const $eduTechnologyListStatus = status({ effect: getEduTechnologyListFx, defaultValue: 'pending' });

export const $competitionPeriodList = EduPlanListDomain.createStore<CompetitionPeriod[]>([]);
export const getCompetitionPeriodList = EduPlanListDomain.createEvent<OptionalVal<string>>();
export const getCompetitionPeriodListFx = EduPlanListDomain.createEffect<OptionalVal<string>, CompetitionPeriod[]>();
export const $competitionPeriodListStatus = status({ effect: getCompetitionPeriodListFx, defaultValue: 'pending' });

export const $enrollmentYearList = EduPlanListDomain.createStore<EnrollmentYear[]>(defaultEnrollmentYearList);
export const getEnrollmentYearList = EduPlanListDomain.createEvent<OptionalVal<string>>();
export const getEnrollmentYearListFx = EduPlanListDomain.createEffect<OptionalVal<string>, EnrollmentYear[]>();
export const $enrollmentYearListStatus = status({ effect: getEnrollmentYearListFx, defaultValue: 'pending' });

export const $eduStartDateList = EduPlanListDomain.createStore<EduStartDate[]>(defaultEduStartDateList);
export const getEduStartDateList = EduPlanListDomain.createEvent<OptionalVal<string>>();
export const getEduStartDateListFx = EduPlanListDomain.createEffect<OptionalVal<string>, EduStartDate[]>();
export const $eduStartDateListStatus = status({ effect: getEduStartDateListFx, defaultValue: 'pending' });

export const $eduPlanList = EduPlanListDomain.createStore<EduPlanListInfo>(defaultEduPlanListInfo);

export const getEduPlanList = EduPlanListDomain.createEvent<GetEduPlanListParams>();
export const getEduPlanListFx = EduPlanListDomain.createEffect<GetEduPlanListParams, EduPlanListInfo>();
export const $getEduPlanListStatus = status({ effect: getEduPlanListFx, defaultValue: 'pending' });

export const $eduPlanListState = EduPlanListDomain.createStore<EduPlanListState>(defaultEduPlanListState);

export const $deleteEduPlanState = EduPlanListDomain.createStore<string>('');
export const resetDeleteEduPlanState = EduPlanListDomain.createEvent();
export const setDeleteEduPlanState = EduPlanListDomain.createEvent<string>();
export const deleteEduPlan = EduPlanListDomain.createEvent();
export const deleteEduPlanFx = EduPlanListDomain.createEffect<string, string>();
export const $deleteEduPlanStatus = status({ effect: deleteEduPlanFx }).reset(resetDeleteEduPlanState);
export const $deleteEduPlanError = EduPlanListDomain.createStore<string>('');
export const dismissDeleteEduPlanError = EduPlanListDomain.createEvent();

export const personEduPlanList = createGetActionNodes<void, EduPlanShortInfo[]>(EduPlanListDomain, [], 'pending');
