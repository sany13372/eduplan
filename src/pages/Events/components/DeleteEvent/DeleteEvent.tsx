import React, { useMemo } from 'react';
import { useStore } from 'effector-react';
import { $deleteItemSelectedId, deleteEvent, resetDeleteItem } from '@src/pages/Events/model';
import { ConfirmDialog } from '@sber-universe/om-component-library';

export const DeleteEvent = () => {
  const deleteItemId = useStore($deleteItemSelectedId);
  const isOpen = useMemo(() => Boolean(deleteItemId), [deleteItemId]);
  const closeDialogHandler = () => {
    resetDeleteItem();
  };

  const confirmHandler = () => {
    if (deleteItemId) deleteEvent({ id: deleteItemId });
  };
  return (
    <ConfirmDialog
      portalId="removeEventPortal"
      isOpen={isOpen}
      onCancel={closeDialogHandler}
      onConfirm={confirmHandler}
      dialogContent={{
        title: 'Удаление события',
        description: 'Вы действительно хотите удалить событие?',
        cancelLabel: 'Отмена',
        confirmLabel: 'Удалить',
      }}
    />
  );
};
