import { ColorBadge } from '@sber-universe/om-component-library';
import { IconProps } from '@kit-edu/icon';
import classnames from 'classnames';

import styles from './Badge.module.css';

type BadgeProps = {
  className?: string;
  text: string;
  iconName?: IconProps['iconName'];
};
export const Badge = ({ className, text, iconName }: BadgeProps) => {
  return (
    <ColorBadge
      text={text}
      appearance="default"
      size="medium"
      iconName={iconName}
      className={classnames(className, styles.badge)}
    />
  );
};
