import React, { useEffect, useMemo } from 'react';
import { useStore } from 'effector-react';
import { deleteTeacher } from '@src/pages/Teachers/model';
import { openSuccessToast } from '@utils/helpers/toast';
import { defaultToastMessage } from '@src/pages/Teachers/model/constants';
import { ConfirmDialog } from '@sber-universe/om-component-library';

export const DeleteTeacher = () => {
  const deleteItemId = useStore(deleteTeacher.$item);
  const isDeleted = useStore(deleteTeacher.$isDeleted);
  const isDeleting = useStore(deleteTeacher.$isDeleting);
  const isOpen = useMemo(() => Boolean(deleteItemId), [deleteItemId]);
  const closeDialogHandler = () => {
    deleteTeacher.reset();
  };

  useEffect(() => {
    if (isDeleted) {
      openSuccessToast(defaultToastMessage);
      deleteTeacher.reset();
    }
  }, [isDeleted]);

  const confirmHandler = () => {
    if (deleteItemId) deleteTeacher.delete(deleteItemId);
  };
  return (
    <ConfirmDialog
      isOpen={isOpen}
      onCancel={closeDialogHandler}
      onConfirm={confirmHandler}
      confirmIsDisabled={isDeleting}
      portalId="removeEventPortal"
      dialogContent={{
        title: 'Подтверждение действия',
        description: 'Вы действительно хотите удалить преподавателя?',
        confirmLabel: 'Удалить',
        cancelLabel: 'Отмена',
      }}
    />
  );
};
