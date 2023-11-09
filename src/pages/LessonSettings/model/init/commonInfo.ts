import { $commonInfo, resetDomain, setCommonInfo } from '@src/pages/LessonSettings/model';

$commonInfo.on(setCommonInfo, (state, val) => ({ ...state, ...val })).reset(resetDomain);
