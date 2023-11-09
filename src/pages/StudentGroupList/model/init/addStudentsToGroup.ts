import {
  addStudentsToGroupFx,
  getStudentsListFx,
  groupStudentModalApi,
  setEduPlanId,
  studentsAddedToGroup,
} from '@src/pages/StudentGroupList/model';
import { resolved } from '@src/gql-client';
import { addStudentsToGroupQuery } from '@src/pages/StudentGroupList/model/init/queries';
import { AddStudentType } from '@src/pages/StudentGroupList/model/types';
import { forward, sample } from 'effector';
import {addSuccessToast} from "@src/app/model";

addStudentsToGroupFx.use(async (params: AddStudentType) =>
  resolved(
    () => {
      return addStudentsToGroupQuery(params);
    },
    { noCache: true },
  ),
);

forward({
  from: studentsAddedToGroup,
  to: addStudentsToGroupFx,
});

sample({
  clock: addStudentsToGroupFx.doneData,
  fn: () => ({}),
  target: [groupStudentModalApi.close, addSuccessToast],
});
