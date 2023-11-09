import { ToastProps } from '@kit-edu/toast';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type ToastInfo = PartialBy<Pick<ToastProps, 'toastId' | 'message' | 'onClose'>, 'message'>;

export type MfeBackground = 'white' | 'gray';
