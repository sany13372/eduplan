import { ConfirmDialog as ConfirmDialogDefault } from '@sber-universe/om-component-library';

type ConfirmDialogProps = {
  isVisible: boolean;
  actionHandler: (val: boolean) => void;
};
export const ConfirmDialog = ({ actionHandler, isVisible }: ConfirmDialogProps) => {
  const closeHandler = () => actionHandler(false);
  const closeAndSubmitHandler = () => actionHandler(true);
  return (
    <ConfirmDialogDefault
      portalId="closeDrawerPortal"
      onConfirm={closeAndSubmitHandler}
      onCancel={closeHandler}
      isOpen={isVisible}
      dialogContent={{
        confirmLabel: 'Да, закрыть',
        cancelLabel: 'Остаться',
        title: 'Подтверждение',
        description:
          'У вас есть несохраненные изменения. Если вы закроете модальное окно, несохраненные данные будут утеряны. Закрыть модальное окно?',
      }}
    />
  );
};
