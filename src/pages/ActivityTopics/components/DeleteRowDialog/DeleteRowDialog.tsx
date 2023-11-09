import { DeleteConfirmDialog } from '@src/components';
import { TopicRow } from '@src/pages/ActivityTopics/model/types';
import { deleteTopicRow } from '@src/pages/ActivityTopics/model';
import { useStore } from 'effector-react';

export const DeleteRowDialog = () => {
  const val = useStore(deleteTopicRow.$item);
  return (
    <DeleteConfirmDialog<TopicRow>
      nodes={deleteTopicRow}
      dialogContent={{
        description: `Вы действительно хотите удалить ${val?.node === 'branch' ? 'структурный элемент' : 'тему'}?`,
      }}
    />
  );
};
