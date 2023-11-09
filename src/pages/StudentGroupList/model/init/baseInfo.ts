import { $baseInfoStore, setBaseInfo } from '@src/pages/StudentGroupList/model';

$baseInfoStore.on(setBaseInfo, (state, val) => val);
