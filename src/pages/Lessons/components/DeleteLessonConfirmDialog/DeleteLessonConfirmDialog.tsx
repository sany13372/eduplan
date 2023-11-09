import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { ConfirmDialog, ErrorDialog } from '@sber-universe/om-component-library';
import { deleteLesson } from '@src/pages/Lessons/model';

export const DeleteLessonConfirmDialog = (): JSX.Element => {
  const item = useStore(deleteLesson.$item);
  const isDeleted = useStore(deleteLesson.$isDeleted);

  const isOpen = Boolean(item);
  const deleteErrorMessage = useStore(deleteLesson.$validationError);

  useEffect(() => deleteLesson.reset, []);
  const onConfirm = () => {
    if (item) deleteLesson.delete(item);
  };

  useEffect(() => {
    if (isDeleted) deleteLesson.reset();
  }, [isDeleted]);
  return (
    <>
      <ConfirmDialog
        onConfirm={onConfirm}
        isOpen={isOpen}
        onCancel={deleteLesson.reset}
        dialogContent={{
          title: 'Удаление занятия',
          description: 'Вы действительно хотите удалить занятие темы мероприятия плана обучения?',
          confirmLabel: 'Удалить',
          cancelLabel: 'Отмена',
        }}
      />
      <ErrorDialog
        isOpen={Boolean(deleteErrorMessage)}
        dialogContent={{ description: deleteErrorMessage }}
        onClose={deleteLesson.reset}
      />
    </>
  );
};
