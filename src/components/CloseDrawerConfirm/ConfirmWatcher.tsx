import { useEnableConfirm } from '@src/utils/hooks';
import { ConfirmEffectorNodes } from '@utils/effector';

type ConfirmWatcherProps = {
  nodes: ConfirmEffectorNodes;
};
export const ConfirmWatcher = ({ nodes }: ConfirmWatcherProps) => {
  useEnableConfirm({ nodes });
  return null;
};
