import { Icon } from '@kit-edu/icon';
import classnames from 'classnames';

export type RemoveButtonProps = {
  className?: string;
  onClick: () => void;
};
export const RemoveButton = ({ className, onClick }: RemoveButtonProps) => {
  return (
    <button type="button" onClick={onClick} className={classnames(className, 'shrink-0')}>
      <Icon iconName="master-master-delete" className="text-base-400 transition hover:text-primary-400" size="16" />
    </button>
  );
};
