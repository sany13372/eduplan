/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { DropdownMenu as DropdownMenuDefault, useControledDropdown, ItemProps } from '@kit-edu/dropdown-menu';
import partialRight from 'lodash/partialRight';

import { OpenNodeDots } from './OpenNodeDots';
import { OpenNodeButton } from './OpenNodeButton';

export type DropdownMenuItem = ItemProps;

/**
 * @description Проверяем, что данный элемент ItemProps  относится к нужному нам подмножеству
 * @param el - элемент меню
 * @param actions - enum  с действиями
 */
export function isValidMenuItem<T extends ItemProps, P extends Record<string, string>>(
  el: DropdownMenuItem,
  actions: P,
): el is T {
  const arr: string[] = Object.values(actions);
  const { id = '' } = el;
  return arr.includes(id);
}

export interface DropdownMenuProps<T extends ItemProps, P extends Record<string, string>> {
  items: T[];
  disabled?: boolean;
  handleChecked: (item: T) => void;
  actions: P;
  type?: 'button' | 'dots';
}

/**
 * @description Обёртка над компонентов DropdownMenu  из ui-kit. Generic'и : T- подмножество ItemProps;P - enum с действиями
 * @param {Object} info - Объект с параметрами.
 * @param {string} info.items -  элементы меню
 * @param {string} info.handleChecked - обработчик клика по пункту меню.
 * @param {string} info.actions -  enum  с действиями
 * @param {boolean} [info.disabled=false] - флаг указывающий включено или нет меню
 * @param {string} [info.type="button"] - тип меню
 */
export function DropdownMenu<T extends ItemProps, P extends Record<string, string>>({
  items,
  handleChecked,
  actions,
  disabled = false,
  type = 'button',
}: DropdownMenuProps<T, P>) {
  const { openDropdown, isOpen, closeDropdown, ...controls } = useControledDropdown();
  const preventBubbling = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  const iconRightName = isOpen ? 'master-chevron-up' : 'master-chevron-down';
  const appearance = isOpen ? 'primary' : 'light-outline';

  const onItemClick = (item: DropdownMenuItem, acts: P) => {
    if (!isValidMenuItem<T, P>(item, acts)) return null;
    handleChecked(item);
    return null;
  };

  const onItemClickPartial = partialRight(onItemClick, actions);
  const openNode =
    type === 'button' ? (
      <OpenNodeButton appearance={appearance} iconRightName={iconRightName} disabled={disabled} />
    ) : (
      <OpenNodeDots disabled={disabled} />
    );
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div onClick={preventBubbling}>
      <DropdownMenuDefault
        {...controls}
        items={items}
        checked={[]}
        disabled={disabled}
        handleChecked={onItemClickPartial}
        closeOnItemClick
        openNode={openNode}
      />
    </div>
  );
}
