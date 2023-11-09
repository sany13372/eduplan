/* eslint-disable react-hooks/exhaustive-deps */
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { ConfirmDialog, ErrorDialog, ConfirmDialogProps } from '@sber-universe/om-component-library';
import { DeleteActionEffectorNode } from '@utils/effector';

const defaultDialogContent: ConfirmDialogProps['dialogContent'] = {
  title: 'Подтверждение действия',
  description: 'Вы действительно хотите удалить элемент?',
  confirmLabel: 'Удалить',
  cancelLabel: 'Отмена',
};
type DeleteConfirmDialogProps<T = string> = {
  nodes: DeleteActionEffectorNode<T>;
  dialogContent?: Partial<ConfirmDialogProps['dialogContent']>;
};
export function DeleteConfirmDialog<T = string>({ dialogContent = {}, nodes }: DeleteConfirmDialogProps<T>) {
  const content = { ...defaultDialogContent, ...dialogContent };
  const item = useStore(nodes.$item);
  const isDeleted = useStore(nodes.$isDeleted);
  const isOpen = Boolean(item);
  const deleteErrorMessage = useStore(nodes.$validationError);
  useEffect(() => nodes.reset, []);
  const onConfirm = () => {
    if (item) nodes.delete(item);
  };
  useEffect(() => {
    if (isDeleted) nodes.reset();
  }, [isDeleted, nodes]);
  return (
    <>
      <ConfirmDialog
        portalId="delete_portal"
        onConfirm={onConfirm}
        isOpen={isOpen}
        onCancel={nodes.reset}
        dialogContent={content}
      />
      <ErrorDialog
        portalId="delete_error_portal"
        isOpen={Boolean(deleteErrorMessage)}
        dialogContent={{
          description: deleteErrorMessage,
        }}
        onClose={nodes.dismissValidationError}
      />
    </>
  );
}
