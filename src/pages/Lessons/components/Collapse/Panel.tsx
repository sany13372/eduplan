import React, { FC } from 'react';
import { Typography } from '@kit-edu/typography';
import { Button } from '@kit-edu/button';
import classNames from 'classnames';

export type StickyPosition = {
  top?: number;
  right?: number;
  left?: number;
  bottom?: number;
};

export type TPanelProps = {
  onClickCollapseButton?: (key: string | number) => void;
  isCollapsed?: boolean;
  title: string;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  id?: string | number;
  disabled?: boolean;
  sticky?: StickyPosition;
};

export const Panel: FC<TPanelProps> = ({
  children,
  onClickCollapseButton,
  isCollapsed,
  title,
  id,
  disabled,
  subtitle,
  actions,
  sticky,
}) => {
  const handleClickCollapseButton = () => {
    if (onClickCollapseButton && id !== undefined && !disabled) {
      onClickCollapseButton(id);
    }
  };

  return (
    <div className="bg-white rounded-l" data-testid="themeBlock">
      <div
        className={classNames('px-6 py-4 box-content flex items-center', {
          'bg-white sticky z-10': Boolean(sticky),
        })}
        style={sticky}
      >
        <Button
          disabled={disabled}
          shape="circular"
          iconLeftName="master-chevron-down"
          size="medium"
          appearance="dark-outline"
          onClick={handleClickCollapseButton}
          className={classNames({
            'transform  transition-transform duration-100 ease-in-out': true,
            'rotate-0': !disabled && isCollapsed,
            '-rotate-180': !disabled && !isCollapsed,
            '-rotate-90': disabled,
          })}
        />

        <div className="flex flex-col justify-between items-start ml-6">
          <Typography as="h2" size="18px" fontWeight="semibold" className="truncate mb-2">
            {title}
          </Typography>

          <Typography size="12px">{subtitle}</Typography>
        </div>

        <div className="ml-auto">{actions}</div>
      </div>
      <div
        className={classNames({
          'overflow-y-hidden': true,
          'h-0': isCollapsed,
          'h-full': !isCollapsed,
        })}
      >
        <div className="px-2 pb-2">{children}</div>
      </div>
    </div>
  );
};
