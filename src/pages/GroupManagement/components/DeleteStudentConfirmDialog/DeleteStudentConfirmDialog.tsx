import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { ConfirmDialog, ErrorDialog } from '@sber-universe/om-component-library';
import { deleteStudent } from '@src/pages/GroupManagement/model';

export const DeleteStudentConfirmDialog = (): JSX.Element => {
  const item = useStore(deleteStudent.$item);
  const isDeleted = useStore(deleteStudent.$isDeleted);

  const isOpen = Boolean(item?.id);
  const deleteErrorMessage = useStore(deleteStudent.$validationError);
  useEffect(() => deleteStudent.reset, []);
  const onConfirm = () => {
    if (item) deleteStudent.delete(item);
  };

  useEffect(() => {
    if (isDeleted) deleteStudent.reset();
  }, [isDeleted]);
  return (
    <>
      <ConfirmDialog
        portalId="remove_student_portal"
        onConfirm={onConfirm}
        isOpen={isOpen}
        onCancel={deleteStudent.reset}
        dialogContent={{
          title: 'Подтверждение действия',
          description: 'Вы действительно хотите удалить обучающегося?',
          confirmLabel: 'Удалить',
          cancelLabel: 'Отмена',
        }}
      />
      <ErrorDialog
        portalId="remove_student_error_portal"
        isOpen={Boolean(deleteErrorMessage)}
        dialogContent={{
          description: deleteErrorMessage,
        }}
        onClose={deleteStudent.dismissValidationError}
      />
    </>
  );
};
