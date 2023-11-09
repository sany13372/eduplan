import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { ConfirmDialog, ErrorDialog } from '@sber-universe/om-component-library';
import { deleteTrajectory } from '@src/pages/IotManagement/model';

export const DeleteIotConfirmDialog = (): JSX.Element => {
  const item = useStore(deleteTrajectory.$item);
  const isDeleted = useStore(deleteTrajectory.$isDeleted);

  const isOpen = Boolean(item?.id);
  const deleteErrorMessage = useStore(deleteTrajectory.$validationError);

  useEffect(() => deleteTrajectory.reset, []);
  const onConfirm = () => {
    if (item) deleteTrajectory.delete(item);
  };

  useEffect(() => {
    if (isDeleted) deleteTrajectory.reset();
  }, [isDeleted]);
  return (
    <>
      <ConfirmDialog
        portalId="remove_iot_portal"
        onConfirm={onConfirm}
        isOpen={isOpen}
        onCancel={deleteTrajectory.reset}
        dialogContent={{
          title: 'Удаление ИОТ обучающегося',
          description: 'Вы действительно хотите удалить индивидуальную образовательную траекторию обучающегося?',
          confirmLabel: 'Удалить',
          cancelLabel: 'Отменить',
        }}
      />
      <ErrorDialog
        portalId="remove_iot_error_portal"
        isOpen={Boolean(deleteErrorMessage)}
        dialogContent={{ description: deleteErrorMessage }}
        onClose={deleteTrajectory.dismissValidationError}
      />
    </>
  );
};
