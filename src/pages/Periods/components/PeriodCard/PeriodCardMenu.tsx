import { DropdownMenu, DropdownMenuItem } from '@src/components';
import { Period } from '@src/pages/Periods/model/types';
import { deletePeriod, setActionStoreValue } from '@src/pages/Periods/model';
import partialRight from 'lodash/partialRight';

export enum Action {
  UPDATE_PERIOD = 'UPDATE_PERIOD',
  REMOVE_PERIOD = 'REMOVE_PERIOD',
}

export type MenuItem = DropdownMenuItem & {
  id: Action;
};

export const items: MenuItem[] = [
  {
    id: Action.UPDATE_PERIOD,
    label: 'Редактировать',
  },
  {
    id: Action.REMOVE_PERIOD,
    label: 'Удалить',
  },
];
type PeriodCardMenuProps = {
  period: Period;
};
export const PeriodCardMenu = ({ period }: PeriodCardMenuProps) => {
  const handleCheckedFull = (item: MenuItem, periodObj: Period) => {
    switch (item.id) {
      case 'UPDATE_PERIOD':
        setActionStoreValue({ action: 'UPDATE', item: periodObj });
        break;
      case 'REMOVE_PERIOD':
        deletePeriod.setItem(periodObj);
        break;
      default:
        console.warn('Действие не найдено');
    }
  };
  const handleChecked = partialRight(handleCheckedFull, period);

  return (
    <DropdownMenu<MenuItem, typeof Action> items={items} handleChecked={handleChecked} actions={Action} type="dots" />
  );
};
