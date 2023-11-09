import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { ConfirmDialog, ErrorDialog } from '@sber-universe/om-component-library';
import { deleteGroup } from '@src/pages/StudentGroupList/model';

export const DeleteEduGroupConfirmDialog = (): JSX.Element => {
  const item = useStore(deleteGroup.$item);
  const isDeleted = useStore(deleteGroup.$isDeleted);

  const isOpen = Boolean(item?.id);
  const deleteErrorMessage = useStore(deleteGroup.$validationError);
  useEffect(() => deleteGroup.reset, []);
  const onConfirm = () => {
    if (item) deleteGroup.delete(item);
  };

  useEffect(() => {
    if (isDeleted) {
      deleteGroup.reset();
    }
  }, [isDeleted]);
  return (
    <>
      <ConfirmDialog
        portalId="remove_group_portal"
        onConfirm={onConfirm}
        isOpen={isOpen}
        onCancel={deleteGroup.reset}
        dialogContent={{
          title: 'Удаление учебной группы',
          description:
            'Вы действительно хотите удалить учебную группу? Обучающиеся не удаляются вместе с группой. Они будут перемещены в папку "Без группы"',
          confirmLabel: 'Удалить',
          cancelLabel: 'Отменить',
        }}
      />
      <ErrorDialog
        portalId="remove_group_error_portal"
        isOpen={Boolean(deleteErrorMessage)}
        dialogContent={{
          description: deleteErrorMessage,
        }}
        onClose={deleteGroup.dismissValidationError}
      />
    </>
  );
};
