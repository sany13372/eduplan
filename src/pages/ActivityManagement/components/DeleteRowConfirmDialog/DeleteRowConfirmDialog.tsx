import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { ConfirmDialog, ErrorDialog } from '@sber-universe/om-component-library';
import { deleteRow } from '@src/pages/ActivityManagement/model';
import { useHistory } from 'react-router-dom';
import { getPath, MfeRoutes } from '@constants/routes';

type DeleteRowConfirmDialogProps = {
  planId: string;
};
export const DeleteRowConfirmDialog = ({ planId }: DeleteRowConfirmDialogProps) => {
  const item = useStore(deleteRow.$item);
  const history = useHistory();
  const isDeleted = useStore(deleteRow.$isDeleted);
  const isOpen = Boolean(item?.id);
  const deleteErrorMessage = useStore(deleteRow.$validationError);
  useEffect(() => deleteRow.reset, []);

  const onConfirm = () => {
    if (item) deleteRow.delete(item);
  };

  useEffect(() => {
    if (isDeleted) {
      history.push(getPath(MfeRoutes.EDU_PLAN_INFO_VIEW, { ':planId': planId }));
      deleteRow.reset();
    }
  }, [history, isDeleted, planId]);
  return (
    <>
      <ConfirmDialog
        portalId="remove_activity_row_portal"
        onConfirm={onConfirm}
        isOpen={isOpen}
        onCancel={deleteRow.reset}
        dialogContent={{
          title: 'Удаление мероприятия',
          description: 'Вы действительно хотите удалить учебное мероприятие?',
          confirmLabel: 'Удалить',
          cancelLabel: 'Отменить',
        }}
      />
      <ErrorDialog
        portalId="remove_activity_row_error_portal"
        isOpen={Boolean(deleteErrorMessage)}
        dialogContent={{
          description: deleteErrorMessage,
        }}
        onClose={deleteRow.dismissValidationError}
      />
    </>
  );
};
