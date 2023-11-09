import { Icon, IconProps } from '@kit-edu/icon';
import classNames from 'classnames';

type CircleIconProps = {
  iconName: IconProps['iconName'];
  className?: string;
};
export const CircleIcon = ({ iconName, className = '' }: CircleIconProps) => {
  return (
    <div
      className={classNames(
        'w-[50px] h-[50px] rounded-full shrink-0  bg-base-100 flex items-center justify-center	',
        className,
      )}
    >
      <Icon iconName={iconName} className="text-[#21BA72]" />
    </div>
  );
};
