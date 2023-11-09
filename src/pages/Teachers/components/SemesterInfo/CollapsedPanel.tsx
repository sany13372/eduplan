import React, { FC } from 'react';
import { Typography } from '@kit-edu/typography';
import { Button } from '@kit-edu/button';
import classNames from 'classnames';

export type CollapsedPanelProps = {
  onClickCollapseButton?: (key: string | number) => void;
  isCollapsed?: boolean;
  title: string;
  renderRightSideInfo?: () => JSX.Element;
  renderLeftSideInfo?: () => JSX.Element;
  id?: string | number;
  disabled?: boolean;
  isTransparent?: boolean;
};

export const CollapsedPanel: FC<CollapsedPanelProps> = ({
  children,
  onClickCollapseButton,
  isCollapsed,
  title,
  renderRightSideInfo = () => undefined,
  renderLeftSideInfo = () => undefined,
  id,
  disabled,
  isTransparent = false,
}) => {
  const handleClickCollapseButton = () => {
    if (onClickCollapseButton && id !== undefined && !disabled) {
      onClickCollapseButton(id);
    }
  };

  return (
    <div>
      <div
        className={classNames({
          'py-4 h-10 box-content flex items-center rounded-[6px] space-x-6': true,
          'bg-white': !isTransparent,
        })}
      >
        <Button
          disabled={disabled}
          shape="circular"
          iconLeftName="master-chevron-down"
          size="medium"
          appearance="light-outline"
          onClick={handleClickCollapseButton}
          className={classNames({
            'transform  transition-transform duration-100 ease-in-out': true,
            'rotate-0': !disabled && isCollapsed,
            '-rotate-180': !disabled && !isCollapsed,
            '-rotate-90': disabled,
          })}
        />
        <Typography as="h2" size="20px" fontWeight="semibold" lineHeight="high" className="truncate ml-2">
          {title}
        </Typography>
        <div className="flex space-between items-center space-x-8">
          <div className="flex items-center flex-shrink-0 ">{renderLeftSideInfo()}</div>

          <div className="flex items-center flex-shrink-0 ">{renderRightSideInfo()}</div>
        </div>
      </div>
      <div
        className={classNames({
          'overflow-y-hidden': true,
          'h-0': isCollapsed,
          'h-full': !isCollapsed,
        })}
      >
        {children}
      </div>
    </div>
  );
};
