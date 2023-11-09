import React, { FC } from 'react';
import { Typography } from '@kit-edu/typography';

type TextGroupProps = {
  mainText: string;
  secondaryText: string;
  reverse?: boolean;
};
export const TextGroup: FC<TextGroupProps> = ({ children, mainText, secondaryText, reverse }) => {
  const secondaryInfo = (
    <Typography as="p" size="14px" color="medium">
      {secondaryText}
    </Typography>
  );
  return (
    <div className="flex flex-col space-y-1">
      {!reverse && secondaryInfo}
      <div className="flex space-x-[6px] items-center" data-testid="eventValue">
        <Typography as="p" size="16px" fontWeight="semibold">
          {mainText}
        </Typography>
        {children}
      </div>
      {reverse && secondaryInfo}
    </div>
  );
};
