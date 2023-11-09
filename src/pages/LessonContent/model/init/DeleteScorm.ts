import { resolved } from '@src/gql-client';
import { connectDeleteActionNodes } from '@utils/effector';
import { deleteSCORM } from '@src/pages/LessonContent/model';
import { deleteScormMutation } from '@src/pages/LessonContent/model/init/queries';

connectDeleteActionNodes({
  nodes: deleteSCORM,
  handler: async (id) => resolved(() => deleteScormMutation(id), { noCache: true }),
  convertErrors: () => '',
});
