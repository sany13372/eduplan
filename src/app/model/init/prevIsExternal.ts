import { $prevIsExternal, setPrevIsExternal } from '@src/app/model';

$prevIsExternal.on(setPrevIsExternal, (_, val) => val);
