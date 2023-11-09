import { deleteLinkedStudent } from '@src/pages/LessonSettings/model';
import { DeleteConfirmDialog } from '@src/components';
import { UnlinkStudentData } from '@src/pages/LessonSettings/model/types';

export const DeleteLinkedStudentConfirmDialog = () => {
  return (
    <DeleteConfirmDialog<UnlinkStudentData>
      nodes={deleteLinkedStudent}
      dialogContent={{
        description: 'Вы действительно хотите исключить обучающегося из потока?',
        confirmLabel: 'Исключить',
      }}
    />
  );
};
