import { resolved } from '@src/gql-client';
import { connectDeleteActionNodes } from '@utils/effector';
import { ShortUserInfo } from '@src/pages/StudentGroupList/model/types';
import { deleteStudentMutation } from '@src/pages/StudentGroupList/model/init/queries';
import { deleteStudent } from '@src/pages/StudentGroupList/model';
import { sample } from "effector";
import { addSuccessToast } from "@src/app/model";

connectDeleteActionNodes<ShortUserInfo>({
  nodes: deleteStudent,
  handler: async (item) => resolved(() => deleteStudentMutation(item.id), { noCache: true }),
  convertErrors: () => '',
});

sample({
  clock: deleteStudent.deleteFx.doneData,
  fn: () => ({ message: 'Данные успешно обновлены' }),
  target: addSuccessToast,
});

