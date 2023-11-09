import { $baseInfo, resetDomain, setBaseInfo } from '@src/widgets/ChooseStudents/model';

$baseInfo.on(setBaseInfo, (_, val) => val).reset(resetDomain);
