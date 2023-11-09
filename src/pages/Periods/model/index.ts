import { createDomain } from 'effector';
import {
  createAddActionNodes,
  createDeleteActionNodes,
  createGetActionNodes,
  createReferenceListNodes,
  createUpdateActionNodes,
} from '@utils/effector';
import { NewPeriod, Period } from '@src/pages/Periods/model/types';

type PeriodAction =
  | {
      action: 'ADD';
    }
  | { action: 'UPDATE'; item: Period };
export const PeriodsDomain = createDomain('PeriodsDomain');
export const resetDomain = PeriodsDomain.createEvent();

export const periodListInfo = createGetActionNodes<string, Period[]>(PeriodsDomain, []);
export const deletePeriod = createDeleteActionNodes<Period>(PeriodsDomain);
export const $actionStore = PeriodsDomain.createStore<PeriodAction | null>(null);
export const setActionStoreValue = PeriodsDomain.createEvent<PeriodAction | null>();
export const periodKindsStore = createReferenceListNodes(PeriodsDomain);

export const createPeriod = createAddActionNodes<NewPeriod>(PeriodsDomain);
export const updatePeriod = createUpdateActionNodes<Period>(PeriodsDomain);

export const $confirmEnable = PeriodsDomain.createStore<boolean>(false);
export const setConfirmEnable = PeriodsDomain.createEvent<boolean>();

export const resetSetPeriodInfo = PeriodsDomain.createEvent();
