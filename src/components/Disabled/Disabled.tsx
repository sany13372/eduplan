/* eslint-disable react/jsx-props-no-spreading */
import React, { HTMLProps } from 'react';
import classnames from 'classnames';

import styles from './Disabled.module.css';

type DisabledProps = { isDisabled?: boolean } & HTMLProps<HTMLDivElement>;
export const Disabled: React.FC<DisabledProps> = ({ isDisabled = false, className = '', children, ...props }) => {
  return (
    <div
      {...props}
      className={classnames({
        [styles.disabled]: isDisabled,
        [className]: className,
      })}
    >
      {children}
    </div>
  );
};
