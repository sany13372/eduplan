import { DropdownMenu, ItemProps } from '@kit-edu/dropdown-menu';
import React from 'react';
import { Icon } from '@kit-edu/icon';

export type ActionMenuItemCustom = ItemProps & {
  handler: () => void;
};

export type ActionMenuProps = {
  menuItems: ActionMenuItemCustom[];
  openNode?: React.ReactNode;
};

export const ActionMenu = ({ menuItems, openNode }: ActionMenuProps): JSX.Element => {
  const onChange = (el: ItemProps) => {
    const { id } = el;
    const menuItem = menuItems.find((e) => e.id === id);
    if (menuItem) menuItem.handler();
    else console.warn('Handler not found.');
  };

  return (
    <DropdownMenu
      items={menuItems}
      checked={[]}
      handleChecked={onChange}
      closeOnItemClick
      openNode={openNode || <Icon iconName="master-dots" className="cursor-pointer" size="16" />}
    />
  );
};
