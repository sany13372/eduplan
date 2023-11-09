import { Drawer } from '@sber-universe/om-component-library';
import { setDrawerInfo } from '@src/pages/LessonSettings/model';
import React from 'react';
import { DrawerData } from '@src/pages/LessonSettings/model/types';
import { useItemsInfo } from '@src/pages/LessonSettings/model/hooks';

import { DatesInfo } from './DatesInfo';
import { StudentsInfo } from './StudentsInfo';
import { TeachersInfo } from './TeachersInfo';
import { MainInfo } from './MainInfo';

export type ViewStreamDrawerProps = {
  isOpen: boolean;
  data: DrawerData | null;
};
export const ViewStreamDrawer = ({ isOpen, data }: ViewStreamDrawerProps) => {
  const { lesson, stream } = useItemsInfo(data);

  if (!lesson || !stream) return null;

  const onClose = () => {
    setDrawerInfo({ type: 'VIEW_STREAM', val: null });
  };
  return (
    <Drawer
      containerClassname="max-w-[900px]"
      onClose={onClose}
      isOpen={isOpen}
      lockScroll
      backDropProps={{
        isTransparent: false,
        isDisabled: false,
        isClickable: true,
      }}
    >
      <Drawer.Header title="Данные потока" onClose={onClose} />
      <Drawer.Content containerClassname="flex flex-col gap-y-4">
        <MainInfo stream={stream} lesson={lesson} />
        <DatesInfo stream={stream} />
        <StudentsInfo stream={stream} />
        <TeachersInfo stream={stream} />
      </Drawer.Content>
    </Drawer>
  );
};
