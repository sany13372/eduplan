import { toast } from '@kit-edu/toast';
import { createEffect, createEvent, sample } from 'effector';

export const openSuccessToast = createEvent<string>();

const openSuccessToastFx = createEffect((description: string) => {
  toast({
    iconName: 'master-check',
    message: description,
    appearance: 'dark',
    containerId: 'main',
    position: 'bottom-right',
    // @ts-ignore
    closeButton: false,
  });
});

sample({
  clock: openSuccessToast,
  target: openSuccessToastFx,
});
