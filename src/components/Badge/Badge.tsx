import React from 'react';
import { Typography } from '@kit-edu/typography';

type Appearance = 'default' | 'success' | 'warning';

const colors = {
  default: 'bg-base-100',
  success: 'bg-green-100',
  warning: 'bg-amber-100',
};

export type BadgeProps = { icon?: React.ReactNode; text: string; appearance?: Appearance };
export const Badge = ({ text, icon, appearance = 'default' }: BadgeProps): JSX.Element => {
  return (
    <div className={`${colors[appearance]} rounded-[6px] p-2 leading-0 flex truncate items-center`}>
      {icon}
      <Typography as="span" size="12px" className={`truncate ${icon ? 'ml-[6px]' : ''}`}>
        {text}
      </Typography>
    </div>
  );
};
