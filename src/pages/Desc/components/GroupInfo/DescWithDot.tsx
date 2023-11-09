import { Typography } from '@kit-edu/typography';
import { ReactComponent as DotIcon } from '@src/assets/icons/common/smallIcon.svg';
import React, { ReactText } from 'react';

type DescWithDotProps = {
  desc: string;
  value: ReactText;
  icon: React.ReactChild;
};

export const DescWithDot = ({ desc, icon, value }: DescWithDotProps) => {
  return (
    <div className="flex items-center space-x-[30px]">
      {icon}
      <Typography as="p" size="16px" lineHeight="high" className="truncate flex space-x-1 items-center">
        <span className="flex-grow-0 truncate">{desc}</span>
        <DotIcon />
        <span className="truncate">{value}</span>
      </Typography>
    </div>
  );
};
