import { useStore } from 'effector-react';
import { ErrorDialog } from '@sber-universe/om-component-library';
import { confirmLesson } from '@src/pages/Lessons/model';

export const ConfirmLessonErrorDialog = (): JSX.Element => {
  const errors = useStore(confirmLesson.$validationErrors);
  const isOpen = Object.keys(errors).length > 0;

  return (
    <ErrorDialog
      isOpen={isOpen}
      dialogContent={{
        description: Object.values(errors)[0],
      }}
      onClose={() => {
        confirmLesson.resetErrors();
      }}
    />
  );
};
