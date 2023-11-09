import { sample } from 'effector';
import { $getInitDataStatus, getInitData, getInitDataFx, resetDomain } from '@src/pages/LessonSettings/model';
import { resolved } from '@src/gql-client';
import { getActivityInitInfoQuery } from '@src/pages/LessonSettings/model/init/queries';

sample({
  clock: getInitData,
  target: getInitDataFx,
});

getInitDataFx.use(async (id) => {
  const resp = await resolved(() => getActivityInitInfoQuery(id), { noCache: true });
  return resp;
});

$getInitDataStatus.reset([resetDomain]);
