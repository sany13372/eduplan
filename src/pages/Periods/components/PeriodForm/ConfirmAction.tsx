import { ConfirmDialog } from '@sber-universe/om-component-library';
import { useStore } from 'effector-react';
import { $confirmEnable } from '@src/pages/Periods/model';

type ConfirmActionProps = {
  isAvailable: boolean;
  onConfirm: () => void;
  onReset: () => void;
};
export const ConfirmAction = ({ onConfirm, isAvailable, onReset }: ConfirmActionProps) => {
  const enableConfirm = useStore($confirmEnable);
  if (!enableConfirm && isAvailable) {
    onConfirm();
  }
  return (
    <ConfirmDialog
      onConfirm={onConfirm}
      isOpen={isAvailable}
      onCancel={onReset}
      dialogContent={{
        title: 'Подтверждение',
        confirmLabel: 'Да, выйти',
        cancelLabel: 'Остаться',
        description:
          'У вас есть несохраненные изменения. Если вы выйдите из режима редактирования, несохраненные данные будут утеряны. Выйти из режима редактирования?',
      }}
    />
  );
};
