import { connectDeleteActionNodes } from '@utils/effector';
import { resolved } from '@src/gql-client';
import { deleteTopicRow } from '@src/pages/ActivityTopics/model';
import { sample } from 'effector';
import { addErrorToast, addSuccessToast } from '@src/app/model';
import { TopicRow } from '@src/pages/ActivityTopics/model/types';
import { deleteTopicRowMutation } from '@src/pages/ActivityTopics/model/init/queries';

connectDeleteActionNodes<TopicRow>({
  nodes: deleteTopicRow,
  handler: async (val) => resolved(() => deleteTopicRowMutation(val), { noCache: true }),
  convertErrors: () => '',
  showErrorToast: false,
});

sample({
  clock: deleteTopicRow.deleteFx.doneData,
  fn: () => ({ message: 'Строка удалена' }),
  target: addSuccessToast,
});

sample({
  clock: deleteTopicRow.deleteFx.fail,
  fn: () => ({ message: 'Не удалось удалить строку' }),
  target: addErrorToast,
});
