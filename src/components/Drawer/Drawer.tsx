import React, { useEffect } from 'react';

type DrawerProps = {
  containerClassname?: string;
  isOpen: boolean;
  onClose: () => void;
  disableBackDrop?: boolean;
  disableBackDropClick?: boolean;
  small?: boolean;
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  disableBackDropClick = false,
  disableBackDrop = false,
  children,
  containerClassname = '',
  small = false,
}) => {
  const backDropClickHandler = () => {
    if (!disableBackDropClick) onClose();
  };

  useEffect(() => {
    if (isOpen) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  const size = small ? 'max-w-screen-sm' : 'max-w-screen-lg';

  return (
    <>
      {isOpen && !disableBackDrop && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div onClick={backDropClickHandler} className="bg-base-600 bg-opacity-50 fixed inset-0 z-[100]" />
      )}
      <aside
        className={`!margin-0 margin-0 overscroll-y-none w-full transform top-0 left-full min-w-0 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-[100] ${
          isOpen ? '-translate-x-full' : 'translate-x-0'
        } ${containerClassname ?? ' bg-white'} ${size}`}
      >
        {children}
      </aside>
    </>
  );
};
