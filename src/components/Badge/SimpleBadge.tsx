import { Typography } from '@kit-edu/typography';
import classNames from 'classnames';

import styles from './SimpleBadge.module.css';

type Variant = 'default' | 'primary';

type SimpleBadgeProps = {
  label: string;
  variant?: Variant;
};
export const SimpleBadge = ({ label, variant = 'default' }: SimpleBadgeProps) => {
  return (
    <p
      className={classNames({
        'px-[10px] py-2 rounded-[6px] truncate leading-3': true,
        [styles.primary]: variant === 'default',
        [styles.default]: variant === 'primary',
      })}
    >
      <Typography as="span" size="12px">
        {label}
      </Typography>
    </p>
  );
};
