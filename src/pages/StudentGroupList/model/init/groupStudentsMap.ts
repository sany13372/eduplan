import { connectGetActionNodes } from '@utils/effector';
import {
  $baseInfoStore,
  $eduPlanGroups,
  addStudentsToGroupFx,
  deleteGroup,
  deleteStudent,
  excludeStudent,
  getEduPlanGroupFx,
  getPageData,
  getPageDataFx,
  groupStudentsMap,
  resetDomain,
  studentsUpdated,
} from '@src/pages/StudentGroupList/model';
import { combine, sample } from 'effector';
import { addErrorToast } from '@src/app/model';
import { resolved } from '@src/gql-client';
import { BaseInfo, GetStudentMapParams, GroupStudentsMap } from '@src/pages/StudentGroupList/model/types';
import { emptyGroupId } from '@src/pages/StudentGroupList/model/constants';
import { getStudentsInfoNewQuery } from '@src/pages/StudentGroupList/model/init/queries';
import { Reference } from '@src/types';
import { prepareGetStudentMapParams } from '@src/pages/StudentGroupList/model/utils';

connectGetActionNodes({
  nodes: groupStudentsMap,
  handler: async (data) => {
    const groupIdList = Object.keys(data.data);
    const resp = await resolved(
      () => {
        const students: GroupStudentsMap = {};
        groupIdList.forEach(async (e) => {
          const hasGroupId = e !== emptyGroupId;
          students[e] = await getStudentsInfoNewQuery(
            data.eduPlanId,
            data.data[e].pagination,
            hasGroupId ? e : undefined,
          );
        });
        return students;
      },
      { noCache: true },
    );
    return resp;
  },
  resetOn: [resetDomain],
});

groupStudentsMap.$value.on(getPageDataFx.done, (state, val) => {
  return { ...state, [val.params.groupId]: val.result };
});

sample({
  clock: getPageData,
  target: getPageDataFx,
});

getPageDataFx.use(async ({ data, planId, groupId }) => {
  const resp = await resolved(
    () => getStudentsInfoNewQuery(planId, data.pagination, groupId !== emptyGroupId ? groupId : undefined),
    { noCache: true },
  );
  return { ...resp, students: [...data.students, ...resp.students] };
});

sample({
  clock: getPageDataFx.fail,
  fn: () => ({ message: 'Не удалось получить информацию об обучающихся' }),
  target: addErrorToast,
});

sample({
  clock: getEduPlanGroupFx.doneData,
  source: $baseInfoStore,
  fn: (s: BaseInfo, c: Reference[]): GetStudentMapParams => prepareGetStudentMapParams(c, s.planId),
  target: groupStudentsMap.get,
});

sample({
  clock: [
    studentsUpdated,
    deleteStudent.deleteFx.done,
    excludeStudent.deleteFx.doneData,
    addStudentsToGroupFx.doneData,
    deleteGroup.deleteFx.done,
  ],
  source: combine($baseInfoStore, $eduPlanGroups, (baseInfo, eduPlanGroups) => ({ baseInfo, groups: eduPlanGroups })),
  fn: ({ groups, baseInfo }): GetStudentMapParams => prepareGetStudentMapParams(groups, baseInfo.planId),
  target: groupStudentsMap.get,
});
