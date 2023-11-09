import React, { useMemo } from 'react';
import { DropdownMenu, DropdownMenuItem } from '@src/components';
import { deleteStream, setDrawerInfo, toggleStreamIsPubl } from '@src/pages/LessonSettings/model';
import { Stream } from '@src/pages/LessonSettings/model/types';

export type MenuItem = DropdownMenuItem & {
  id: Action;
};

export enum Action {
  UPDATE_STREAM = 'UPDATE_STREAM',
  START_STREAM = 'START_STREAM',
  STOP_STREAM = 'STOP_STREAM',
  REMOVE_STREAM = 'REMOVE_STREAM',
}

export const items: MenuItem[] = [
  {
    id: Action.UPDATE_STREAM,
    label: 'Настроить',
  },
  {
    id: Action.START_STREAM,
    label: 'Запустить',
  },
  {
    id: Action.STOP_STREAM,
    label: 'Остановить',
  },
  {
    id: Action.REMOVE_STREAM,
    label: 'Удалить',
  },
];

export const ActionMenu = ({ data }: { data: Stream }) => {
  const filteredItems = useMemo(
    () =>
      items.filter((e) => {
        const filterByValue: keyof typeof Action = data.isPublic ? 'START_STREAM' : 'STOP_STREAM';
        return e.id !== filterByValue;
      }),
    [data.isPublic],
  );

  const handleChecked = (item: MenuItem) => {
    switch (item.id) {
      case 'START_STREAM':
      case 'STOP_STREAM':
        toggleStreamIsPubl(data);
        break;
      case 'UPDATE_STREAM':
        setDrawerInfo({ type: 'VIEW_STREAM', val: { id: data.id, lessonId: data.lessonId, themeId: data.themeId } });
        break;
      case 'REMOVE_STREAM':
        deleteStream.setItem(data);
        break;
      default:
        console.warn('Действие не найдено');
    }
  };

  return (
    <DropdownMenu<MenuItem, typeof Action>
      items={filteredItems}
      handleChecked={handleChecked}
      actions={Action}
      type="dots"
    />
  );
};
