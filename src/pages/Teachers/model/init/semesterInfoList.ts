import { connectGetActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { deleteTeacher, resetDomainData, semesterListInfo, updateTeacherList } from '@src/pages/Teachers/model';
import { ActivityInfo, SemesterInfo, TeacherInfo } from '@src/pages/Teachers/model/types';
import { getSemesterInfoListQuery } from '@src/pages/Teachers/model/init/queries';
import sortBy from 'lodash/sortBy';
import isNil from 'lodash/isNil';
import { partial } from 'lodash';

connectGetActionNodes({
  nodes: semesterListInfo,
  handler: async (eduPlanId) => resolved(() => getSemesterInfoListQuery(eduPlanId), { noCache: true }),
  resetOn: [resetDomainData],
});

const updateSemTeacherListInfo = (
  updFn: (activity: ActivityInfo) => TeacherInfo[],
  semList: SemesterInfo[],
  path: string[],
): SemesterInfo[] => {
  const semesterInd = semList.findIndex((e) => e.id === (path[0] ?? ''));
  if (isNil(semesterInd)) return semList;
  const activityInd = semList[semesterInd]?.activityList.findIndex((e) => e.id === (path[1] ?? ''));

  if (isNil(activityInd)) return semList;
  const sem = semList[semesterInd];
  const activity = sem.activityList[activityInd];
  const teacherList = updFn(activity);
  const resp = [...semList];
  resp[semesterInd].activityList[activityInd].teacherList = teacherList;
  return resp;
};

semesterListInfo.$value
  .on(deleteTeacher.deleteFx.done, (state, { params }) => {
    const path = params.split('.');
    const filterTeacherListFn = (id = '', activity: ActivityInfo) => activity.teacherList.filter((e) => e.id !== id);
    const resp = updateSemTeacherListInfo(partial(filterTeacherListFn, path[2]), state, path);
    return resp;
  })
  .on(updateTeacherList.updateFx.done, (state, { params }) => {
    const path = params.path.split('.');
    const updateTeacherListFn = (newItems: TeacherInfo[], activity: ActivityInfo) =>
      sortBy(activity.teacherList.concat(newItems), ['lastName', 'firstName', 'middleName']);
    const resp = updateSemTeacherListInfo(partial(updateTeacherListFn, params.teacherList), state, path);
    return resp;
  });
