import { $newFilters, resetDomain, resetNewFilterVal, setNewFilterVal } from '@src/pages/IotManagement/model';

$newFilters.on(setNewFilterVal, (state, val) => ({ ...state, ...val })).reset([resetDomain, resetNewFilterVal]);
