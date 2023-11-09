/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';

type PanelProps = React.HTMLProps<HTMLDivElement>;
export const Panel: FC<PanelProps> = ({ className, children, ...props }) => {
  return (
    <div className={`bg-base-200 rounded-[8px] ${className}`} {...props}>
      {children}
    </div>
  );
};
