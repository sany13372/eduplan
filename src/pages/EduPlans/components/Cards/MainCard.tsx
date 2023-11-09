import { Icon, IconProps } from '@kit-edu/icon';
import { ContentPanel } from '@sber-universe/om-component-library';
import { Typography } from '@kit-edu/typography';
import { CircleIcon } from '@src/components';
import React from 'react';
import classNames from 'classnames';

export type MainCardProps = {
  iconName: IconProps['iconName'];
  actionIconName?: IconProps['iconName'];
  label: string;
  className?: string;
  dataTestId: string;
};
export const MainCard: React.FC<MainCardProps> = ({
  label,
  iconName,
  dataTestId,
  children,
  actionIconName,
  className = '',
}) => {
  return (
    <ContentPanel className={classNames('px-6 py-4.5 flex gap-6 h-full', className)} data-testid={dataTestId}>
      <CircleIcon iconName={iconName} />
      <div className="flex gap-1.5 flex flex-col grow">
        <div className="flex gap-1.5 justify-between items-top w-full">
          <Typography as="h5" lineHeight="high" size="14px" color="medium">
            {label}
          </Typography>
          {actionIconName && <Icon iconName={actionIconName} className="text-[#52525B] shrink-0" />}
        </div>
        {children}
      </div>
    </ContentPanel>
  );
};
