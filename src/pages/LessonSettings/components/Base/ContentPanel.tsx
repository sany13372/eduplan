/* eslint-disable react/jsx-props-no-spreading */
import React, { HTMLProps } from 'react';
import classnames from 'classnames';

type ContentPanelProps = { variant?: 'white' | 'gray' } & HTMLProps<HTMLDivElement>;
export const ContentPanel: React.FC<ContentPanelProps> = ({ children, variant = 'gray', className = '', ...props }) => {
  return (
    <div
      className={classnames({
        'bg-base-100 rounded-lg py-4 px-4.5': variant === 'gray',
        'bg-white rounded-md px-6 pt-6 pb-[30px]': variant === 'white',
        [className]: className,
      })}
      {...props}
    >
      {children}
    </div>
  );
};
