import { useStore } from 'effector-react';
import { ConfirmDialog } from '@sber-universe/om-component-library';
import { $deleteEduPlanRow, deleteEduPlanRow, resetDeleteEduPlanRow } from '@src/pages/ActivityList/model';
import { DialogContent } from '@sber-universe/om-component-library/dist/ConfirmDialog';

const deleteGroupActivityContent: DialogContent = {
  confirmLabel: 'Удалить',
  title: 'Удаление группы мероприятий',
  description: 'Вы действительно хотите удалить группу мероприятий?',
  cancelLabel: 'Отменить',
};

const deleteActivityContent: DialogContent = {
  confirmLabel: 'Удалить',
  title: 'Удаление мероприятия',
  description: 'Вы действительно хотите удалить учебное мероприятие?',
  cancelLabel: 'Отменить',
};

export const DeleteConfirmationModal = (): JSX.Element => {
  const deleteEduPlanRowData = useStore($deleteEduPlanRow);
  const isOpen = Boolean(deleteEduPlanRowData);
  const isGroup = deleteEduPlanRowData?.isGroup ?? false;

  const closeHandler = () => resetDeleteEduPlanRow();

  const confirmAndClose = () => {
    if (deleteEduPlanRowData) deleteEduPlanRow(deleteEduPlanRowData);
  };

  return (
    <ConfirmDialog
      portalId="delete-user-link-confirm-portal"
      isOpen={isOpen}
      onConfirm={confirmAndClose}
      onCancel={closeHandler}
      dialogContent={isGroup ? deleteGroupActivityContent : deleteActivityContent}
    />
  );
};
