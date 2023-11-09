import { useStore } from 'effector-react';
import { availableToLinkTeachersCount, linkedTeachers, setDrawerInfo } from '@src/pages/LessonSettings/model';
import { useItemsInfo } from '@src/pages/LessonSettings/model/hooks';
import { DrawerData } from '@src/pages/LessonSettings/model/types';
import React, { useEffect } from 'react';
import { Drawer, LoadingWrapper } from '@sber-universe/om-component-library';
import { EmptyList, StreamDescBlock } from '@src/pages/LessonSettings/components';

import { LinkedTeacherList } from './LinkedTeacherList';
import { LinkTeacherButton } from './LinkTeacherButton';

export type ViewLinkedTeachersDrawerProps = {
  isOpen: boolean;
  data: DrawerData | null;
};
export const ViewLinkedTeachersDrawer = ({ isOpen, data }: ViewLinkedTeachersDrawerProps) => {
  const portalId = 'viewLinkedTeachersPortal';
  const initDataStatus = useStore(linkedTeachers.$status);
  const countStatus = useStore(availableToLinkTeachersCount.$status);
  const teachers = useStore(linkedTeachers.$value);
  const hasTeachers = teachers.length !== 0;
  const { lesson, stream } = useItemsInfo(data);

  useEffect(() => {
    if (isOpen) {
      linkedTeachers.get(stream?.lessonImplId ?? '');
      availableToLinkTeachersCount.get(stream?.lessonImplId ?? '');
    } else {
      linkedTeachers.reset();
    }
  }, [isOpen, stream?.lessonImplId]);

  const onClose = () => {
    setDrawerInfo({ type: 'VIEW_LINKED_TEACHERS', val: null });
  };

  if (!lesson || !stream) return null;

  return (
    <Drawer
      containerClassname="max-w-[900px]"
      onClose={onClose}
      isOpen={isOpen}
      portalId={portalId}
      lockScroll
      backDropProps={{
        isClickable: true,
        isDisabled: false,
        isTransparent: true,
      }}
    >
      <Drawer.Header title="Проверяющие потока" onClose={onClose} />
      <Drawer.Content>
        <LoadingWrapper
          loadingStatusList={[countStatus, initDataStatus]}
          errorStatusList={[countStatus, initDataStatus]}
        >
          <div className="flex flex-col gap-y-6">
            <StreamDescBlock title={lesson.title} stream={stream.title} />
            <div className="flex justify-end">
              <LinkTeacherButton stream={stream} lesson={lesson} />
            </div>
            {hasTeachers ? (
              <LinkedTeacherList stream={stream} items={teachers} />
            ) : (
              <EmptyList title="Проверяющие еще не добавлены" />
            )}
          </div>
        </LoadingWrapper>
      </Drawer.Content>
    </Drawer>
  );
};
