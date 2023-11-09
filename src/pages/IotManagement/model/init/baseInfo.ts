import { $baseInfo, resetDomain, setBaseInfo } from '@src/pages/IotManagement/model';

$baseInfo.on(setBaseInfo, (_, val) => ({ planId: val })).reset([resetDomain]);
