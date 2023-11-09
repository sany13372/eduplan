import { toast, closeToast } from '@kit-edu/toast';
import { addErrorToast, addErrorToastFx, addSuccessToast, addSuccessToastFx } from '@src/app/model';
import { forward } from 'effector';

const defaultDesc = 'Что-то пошло не так. Попробуйте ещё раз.';
const defaultSuccessDesc = 'Данные успешно обновлены';
forward({
  from: addErrorToast,
  to: addErrorToastFx,
});
addErrorToastFx.use(({ message = defaultDesc, onClose, toastId }) => {
  toast({
    containerId: 'main',
    toastId: toastId ?? new Date().getTime(),
    message,
    position: 'bottom-right',
    iconName: 'master-warning',
    onClose,
    appearance: 'negative',
  });
});

forward({
  from: addSuccessToast,
  to: addSuccessToastFx,
});
addSuccessToastFx.use(({ message = defaultSuccessDesc, onClose, toastId }) => {
  const id = toastId ?? new Date().getTime();
  toast({
    containerId: 'main',
    toastId: id,
    message,
    onCloseButton: () => {
      if (onClose) onClose({});
      closeToast(id);
    },
    iconName: 'master-check',
    position: 'bottom-right',
    appearance: 'positive',
  });
});
