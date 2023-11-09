import React, { FC } from 'react';
import classNames from 'classnames';
import { Icon, Icons } from '@kit-edu/icon';
import { Typography } from '@kit-edu/typography';

interface Props {
  title: string;
  subtitle: string;
  iconName?: Icons;
  width: '1/2' | '1/5';
}

const classNameByWidth = {
  '1/2': 'flex gap-6 w-[calc(50%-0.25rem)]',
  '1/5': 'w-[calc(20%-0.4rem)]',
};

export const InfoCard: FC<Props> = ({ title, subtitle, iconName, width }) => {
  return (
    <div className={classNames('rounded px-6 py-[1.125rem] bg-white', classNameByWidth[width])} data-testid="infoCard">
      {iconName && (
        <div className="flex max-h-[50px] justify-center items-center rounded-full bg-base-100 p-4 text-green-500">
          <Icon iconName={iconName} size="20" />
        </div>
      )}
      <div>
        <Typography as="h4" size="14px" color="medium" className="mb-2">
          {title}
        </Typography>
        <Typography size="16px" fontWeight="semibold" color="dark">
          {subtitle}
        </Typography>
      </div>
    </div>
  );
};
