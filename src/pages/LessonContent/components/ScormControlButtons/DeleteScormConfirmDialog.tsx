import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { ConfirmDialog, ErrorDialog } from '@sber-universe/om-component-library';
import { deleteSCORM } from '@src/pages/LessonContent/model';

export const DeleteScormConfirmDialog = (): JSX.Element => {
  const item = useStore(deleteSCORM.$item);
  const isDeleted = useStore(deleteSCORM.$isDeleted);
  const isDeleting = useStore(deleteSCORM.$isDeleting);

  const isOpen = Boolean(item);
  const deleteErrorMessage = useStore(deleteSCORM.$validationError);
  useEffect(() => deleteSCORM.reset, []);
  const onConfirm = () => {
    if (item) deleteSCORM.delete(item);
  };

  useEffect(() => {
    if (isDeleted) deleteSCORM.reset();
  }, [isDeleted]);
  return (
    <>
      <ConfirmDialog
        portalId="remove_scorm_portal"
        onConfirm={onConfirm}
        isOpen={isOpen}
        confirmIsDisabled={isDeleting}
        onCancel={deleteSCORM.reset}
        dialogContent={{
          title: 'Удаление SCORM пакета',
          description: 'Вы действительно хотите удалить SCORM пакет?',
          confirmLabel: 'Удалить',
          cancelLabel: 'Отменить',
        }}
      />
      <ErrorDialog
        portalId="remove_scorm_error_portal"
        isOpen={Boolean(deleteErrorMessage)}
        dialogContent={{
          description: deleteErrorMessage,
        }}
        onClose={deleteSCORM.dismissValidationError}
      />
    </>
  );
};
