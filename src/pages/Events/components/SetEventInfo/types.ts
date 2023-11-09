import { SetEventInfo } from '@src/pages/Events/model/types';

export type SetEventInfoFormProps = {
  initData: SetEventInfo;
  onSubmit: (values: SetEventInfo) => void;
  onReset: () => void;
  isLoading: boolean;
};
export type SetEventInfoFormContentProps = {
  isCreateItemForm: boolean;
} & Pick<SetEventInfoFormProps, 'isLoading' | 'onReset'>;
