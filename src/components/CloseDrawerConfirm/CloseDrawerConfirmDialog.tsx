import { ConfirmEffectorNodes } from '@utils/effector';
import { ConfirmDialog, ConfirmDialogProps } from '@sber-universe/om-component-library';
import { useStore } from 'effector-react';

type CloseDrawerConfirmDialogProps = {
  nodes: ConfirmEffectorNodes;
  content?: ConfirmDialogProps['dialogContent'];
};
export const CloseDrawerConfirmDialog = ({
  nodes,
  content = {
    confirmLabel: 'Да, закрыть',
    cancelLabel: 'Остаться',
    description: 'Если вы закроете страницу, несохраненные данные будут утеряны. Закрыть страницу?',
    title: 'Подтверждение действия',
  },
}: CloseDrawerConfirmDialogProps) => {
  const isDisabled = !useStore(nodes.$confirmIsRequired);
  const isOpen = useStore(nodes.$showConfirmDialog);
  const callback = useStore(nodes.$callback);
  const onCancel = () => {
    nodes.setShowConfirmDialog(false);
  };

  const onConfirm = () => {
    nodes.setShowConfirmDialog(false);
    callback();
  };

  return (
    <ConfirmDialog
      confirmIsDisabled={isDisabled}
      isOpen={isOpen}
      onCancel={onCancel}
      onConfirm={onConfirm}
      dialogContent={content}
      portalId="confirm_drawer_close"
    />
  );
};
