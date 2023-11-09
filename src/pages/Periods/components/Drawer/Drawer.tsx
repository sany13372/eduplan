import React, { useEffect } from 'react';
import classnames from 'classnames';
import { BackDrop } from '@src/pages/Periods/components/Drawer/BackDrop';
import { Typography } from '@kit-edu/typography';
import { Button } from '@kit-edu/button';

import styles from './Drawer.module.css';

type TitleProps = {
  title: string;
  onClose: () => void;
};
const Title = ({ title, onClose }: TitleProps) => {
  return (
    <div className="flex items-center space-x-4 justify-between shrink-0 px-9 pt-6">
      <Typography size="24px" lineHeight="high" fontWeight="semibold">
        {title}
      </Typography>
      <Button onClick={onClose} iconLeftName="master-close" size="medium" appearance="light-outline" shape="circular" />
    </div>
  );
};

type DrawerProps = {
  containerClassname?: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  disableBackDrop?: boolean;
  disableBackDropClick?: boolean;
  isNested?: boolean;
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  disableBackDropClick = false,
  disableBackDrop = false,
  children,
  containerClassname = 'bg-base-200',
  isNested = false,
}) => {
  const drawerIsVisible = isOpen && !disableBackDrop;

  const backDropClickHandler = () => {
    if (!disableBackDropClick) onClose();
  };

  useEffect(() => {
    if (isOpen && !isNested) {
      document.body.classList.add('overflow-hidden');
    }
    return () => {
      if (isOpen && !isNested) document.body.classList.remove('overflow-hidden');
    };
  }, [isNested, isOpen]);
  return (
    <div>
      <BackDrop isVisible={drawerIsVisible} clickHandler={backDropClickHandler} isNested={isNested} />
      <aside
        className={classnames({
          [styles.drawer]: true,
          [containerClassname]: true,
          '-translate-x-full': isOpen,
          'translate-x-0': !isOpen,
        })}
      >
        <div
          className={classnames({
            [containerClassname]: true,
            [styles.drawerContent]: true,
            'h-full': true,
          })}
        >
          <Title title={title} onClose={onClose} />
          <div className="grow h-full overflow-auto px-9 py-6">{children}</div>
        </div>
      </aside>
    </div>
  );
};
