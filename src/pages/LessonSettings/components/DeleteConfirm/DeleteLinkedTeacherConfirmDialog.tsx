import { deleteLinkedTeacher } from '@src/pages/LessonSettings/model';
import { DeleteConfirmDialog } from '@src/components';
import { UnlinkTeachersData } from '@src/pages/LessonSettings/model/types';

export const DeleteLinkedTeacherConfirmDialog = () => {
  return (
    <DeleteConfirmDialog<UnlinkTeachersData>
      nodes={deleteLinkedTeacher}
      dialogContent={{
        description: 'Вы действительно хотите исключить проверяющего из потока?',
        confirmLabel: 'Исключить',
      }}
    />
  );
};
