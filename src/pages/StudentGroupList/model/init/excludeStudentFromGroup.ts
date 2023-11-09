import { resolved } from '@src/gql-client';
import { connectDeleteActionNodes } from '@utils/effector';
import { ShortUserInfo } from '@src/pages/StudentGroupList/model/types';
import { excludeStudent } from '@src/pages/StudentGroupList/model';
import { excludeStudentFromGroupQuery } from '@src/pages/StudentGroupList/model/init/queries';
import { sample } from "effector";
import { addSuccessToast } from "@src/app/model";

connectDeleteActionNodes<ShortUserInfo>({
  nodes: excludeStudent,
  handler: async (student) => resolved(() => excludeStudentFromGroupQuery([student.id]), { noCache: true }),
  convertErrors: () => '',
});

sample({
  clock: excludeStudent.deleteFx.doneData,
  fn: () => ({ message: 'Данные успешно обновлены' }),
  target: addSuccessToast,
});
