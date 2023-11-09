import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { ConfirmDialog, ErrorDialog } from '@sber-universe/om-component-library';
import { deleteIotTemplate } from '@src/pages/IotTemplateList/model';

export const DeleteIotTemplateConfirmDialog = (): JSX.Element => {
  const item = useStore(deleteIotTemplate.$item);
  const isDeleted = useStore(deleteIotTemplate.$isDeleted);

  const isOpen = Boolean(item?.id);
  const deleteErrorMessage = useStore(deleteIotTemplate.$validationError);

  useEffect(() => deleteIotTemplate.reset, []);
  const onConfirm = () => {
    if (item) deleteIotTemplate.delete(item);
  };

  useEffect(() => {
    if (isDeleted) deleteIotTemplate.reset();
  }, [isDeleted]);
  return (
    <>
      <ConfirmDialog
        onConfirm={onConfirm}
        isOpen={isOpen}
        onCancel={deleteIotTemplate.reset}
        dialogContent={{
          title: 'Удаление шаблона ИОТ',
          description: 'Вы действительно хотите удалить шаблон индивидуальной образовательной траектории?',
          confirmLabel: 'Удалить',
          cancelLabel: 'Отменить',
        }}
      />
      <ErrorDialog
        isOpen={Boolean(deleteErrorMessage)}
        onClose={deleteIotTemplate.dismissValidationError}
        dialogContent={{ description: deleteErrorMessage }}
      />
    </>
  );
};
