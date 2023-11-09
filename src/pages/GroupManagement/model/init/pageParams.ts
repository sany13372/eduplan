import { $pageParams, resetDomain, setPageParams } from '@src/pages/GroupManagement/model';

$pageParams.on(setPageParams, (_, data) => data).reset(resetDomain);
