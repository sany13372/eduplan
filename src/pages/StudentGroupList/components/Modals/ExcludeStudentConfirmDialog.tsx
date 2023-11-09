import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { ConfirmDialog, ErrorDialog } from '@sber-universe/om-component-library';
import { excludeStudent } from '@src/pages/StudentGroupList/model';

export const ExcludeStudentConfirmDialog = (): JSX.Element => {
  const item = useStore(excludeStudent.$item);
  const isDeleted = useStore(excludeStudent.$isDeleted);

  const isOpen = Boolean(item?.id);
  const deleteErrorMessage = useStore(excludeStudent.$validationError);
  useEffect(() => excludeStudent.reset, []);
  const onConfirm = () => {
    if (item) excludeStudent.delete(item);
  };

  useEffect(() => {
    if (isDeleted) excludeStudent.reset();
  }, [isDeleted]);

  return (
    <>
      <ConfirmDialog
        portalId="remove_student_portal"
        onConfirm={onConfirm}
        isOpen={isOpen}
        onCancel={excludeStudent.reset}
        dialogContent={{
          title: 'Подтверждение действия',
          description:
            'Вы действительно хотите исключить обучающегося из группы? Обучающийся будет перемещён в папку «Без группы»',
          confirmLabel: 'Исключить',
          cancelLabel: 'Отмена',
        }}
      />
      <ErrorDialog
        portalId="remove_student_error_portal"
        isOpen={Boolean(deleteErrorMessage)}
        dialogContent={{
          description: deleteErrorMessage,
        }}
        onClose={excludeStudent.dismissValidationError}
      />
    </>
  );
};
