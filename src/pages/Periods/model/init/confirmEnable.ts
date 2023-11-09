import { $confirmEnable, resetDomain, resetSetPeriodInfo, setConfirmEnable } from '@src/pages/Periods/model';

$confirmEnable.on(setConfirmEnable, (_, val) => val).reset([resetDomain, resetSetPeriodInfo]);
