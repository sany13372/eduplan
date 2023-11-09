import { useMemo } from 'react';
import { Typography } from '@kit-edu/typography';

import avatar from './Avatar.module.css';

type AvatarProps = {
  firstName: string;
  lastName: string;
  size: 'small' | 'large';
};

export const Avatar = ({ lastName, firstName, size }: AvatarProps) => {
  const initials = useMemo(() => `${firstName.substr(0, 1)}${lastName.substr(0, 1)}`, [firstName, lastName]);
  return (
    <div
      className={`rounded-full bg-positive-600 text-white flex items-center justify-center ${
        size === 'large' ? avatar.large : avatar.small
      }`}
    >
      <Typography size={size === 'small' ? '14px' : '20px'} as="span">
        {initials}
      </Typography>
    </div>
  );
};
