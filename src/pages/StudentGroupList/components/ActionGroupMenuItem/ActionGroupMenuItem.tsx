import { Button } from '@kit-edu/button';
import { DropdownMenu, ItemProps } from '@kit-edu/dropdown-menu';
import React, { FC, useState } from 'react';
import { ButtonAppearance } from '@kit-edu/button/build/interfaces';

interface ActionGroupMenuItemProps {
  items: ItemProps[];
  appearance: ButtonAppearance;
  openNodeTitle: string;
  classNameButton?: string;
  checked?: ItemProps[];
  handleChecked?: (item: ItemProps) => void;
  dataTestId?: string;
}
export const ActionGroupMenuItem: FC<ActionGroupMenuItemProps> = ({
  items,
  checked = [],
  handleChecked = () => {},
  appearance,
  openNodeTitle,
  classNameButton,
  dataTestId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleChangeChecked = (item: ItemProps) => {
    handleChecked(item);
    setIsOpen(false);
  };
  const onClickOutside = () => setIsOpen(false);
  return (
    <DropdownMenu
      dataTestId={dataTestId}
      items={items}
      checked={checked}
      handleChecked={handleChangeChecked}
      onClickOutside={onClickOutside}
      closeOnItemClick
      openNode={
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className={classNameButton}
          dataTestId={dataTestId}
          iconRightName={isOpen ? 'master-chevron-up' : 'master-chevron-down'}
          appearance={appearance}
        >
          {checked.length > 0 ? checked[0].label : openNodeTitle}
        </Button>
      }
    />
  );
};
