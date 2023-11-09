import { DropdownMenu, ItemProps } from '@kit-edu/dropdown-menu';
import React, { FC, ReactText, useState } from 'react';
import { Icon } from '@kit-edu/icon';
import cn from 'clsx'

type TItem = {
  id: string;
  label: string;
};

type TProps = {
  items: TItem[];
  onChangeDropdownMenu: (key: ReactText) => void;
};

export const Cell: FC<TProps> = ({ children, items, onChangeDropdownMenu }) => {
  const [isOpen,setIsOpen] = useState<boolean>(false)
  const onChange = (val: ItemProps) => {
    onChangeDropdownMenu(val?.id ?? '');
    setIsOpen(false)
  };
  return (
    <div className={cn(`flex items-center w-[32px] h-[32px] hover:bg-[#E4E4E7] ${isOpen && 'bg-[#E4E4E7] border'} hover:border border-solid border-[#A1A1AA] rounded-md`)}>
      {children}
      <DropdownMenu
        items={items}
        checked={[]}
        closeOnItemClick
        handleChecked={onChange}
        onClickOutside={() => setIsOpen(false)}
        openNode={<Icon iconName="master-range" onClick={() => setIsOpen(!isOpen)} className="cursor-pointer absolute top-[-16px] left-[3px]" color="dark" size="24" />}
      />
    </div>
  );
};
