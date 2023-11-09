import { deleteStream } from '@src/pages/LessonSettings/model';
import { DeleteConfirmDialog } from '@src/components';
import { Stream } from '@src/pages/LessonSettings/model/types';

export const DeleteStreamConfirmDialog = () => {
  return (
    <DeleteConfirmDialog<Stream>
      nodes={deleteStream}
      dialogContent={{ description: 'Вы действительно хотите удалить поток?' }}
    />
  );
};
