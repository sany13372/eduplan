import { Action, MenuItem } from './types';

export const items: MenuItem[] = [
  {
    id: Action.CREATE_ACTIVITY,
    label: 'Добавить мероприятие',
  },
  {
    id: Action.CREATE_ACTIVITY_GROUP,
    label: 'Добавить группу',
  },
  {
    id: Action.PERIODS_MANAGEMENT,
    label: 'Настроить периоды',
  },
];
