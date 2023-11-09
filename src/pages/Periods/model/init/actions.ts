import { $actionStore, resetDomain, resetSetPeriodInfo, setActionStoreValue } from '@src/pages/Periods/model';

$actionStore.on(setActionStoreValue, (_, val) => val).reset([resetDomain, resetSetPeriodInfo]);
