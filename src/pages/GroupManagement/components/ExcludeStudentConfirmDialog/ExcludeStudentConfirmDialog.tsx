import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { ConfirmDialog, ErrorDialog } from '@sber-universe/om-component-library';
import { excludeStudent } from '@src/pages/GroupManagement/model';

export const ExcludeStudentConfirmDialog = () => {
  const item = useStore(excludeStudent.$item);
  const isDeleted = useStore(excludeStudent.$isDeleted);

  const isOpen = Boolean(item?.id);
  const deleteErrorMessage = useStore(excludeStudent.$validationError);

  const onConfirm = () => {
    if (item) excludeStudent.delete(item);
  };

  useEffect(() => {
    if (isDeleted) excludeStudent.reset();
  }, [isDeleted]);
  return (
    <>
      <ConfirmDialog
        portalId="exclude_student_portal"
        onConfirm={onConfirm}
        onCancel={excludeStudent.reset}
        isOpen={isOpen}
        dialogContent={{
          title: 'Подтверждение действия',
          description:
            'Вы действительно хотите исключить обучающегося из группы? Обучающийся будет перемещён в папку «Без группы»',
          cancelLabel: 'Отмена',
          confirmLabel: 'Исключить',
        }}
      />
      <ErrorDialog
        portalId="exclude_student_error_portal"
        isOpen={Boolean(deleteErrorMessage)}
        dialogContent={{
          description: deleteErrorMessage,
        }}
        onClose={excludeStudent.dismissValidationError}
      />
    </>
  );
};
