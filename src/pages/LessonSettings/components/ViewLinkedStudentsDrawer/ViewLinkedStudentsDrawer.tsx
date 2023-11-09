/* eslint-disable react-hooks/exhaustive-deps */
import { useStore } from 'effector-react';
import {
  $linkedStudentsFioFilter,
  availableToLinkStudentsCount,
  initialLinkedStudents,
  linkedStudents,
  setDrawerInfo,
  setLinkedStudentsFioFilter,
} from '@src/pages/LessonSettings/model';
import { useItemsInfo } from '@src/pages/LessonSettings/model/hooks';
import { DrawerData } from '@src/pages/LessonSettings/model/types';
import React, { useEffect } from 'react';
import { Drawer, LoadingWrapper } from '@sber-universe/om-component-library';
import { FioFilter, StreamDescBlock } from '@src/pages/LessonSettings/components';
import { useBackgroundClassName } from '@utils/hooks';
import { EmptyStub } from '@src/pages/LessonSettings/components/ViewLinkedStudentsDrawer/EmptyStub';

import { LinkedStudentsList } from './LinkedStudentsList';
import { LinkStudentsButton } from './LinkStudentsButton';

export type ViewLinkedStudentsDrawerProps = {
  isOpen: boolean;
  data: DrawerData | null;
};
export const ViewLinkedStudentsDrawer = ({ isOpen, data }: ViewLinkedStudentsDrawerProps) => {
  const portalId = 'viewLinkedStudentsPortal';
  const filter = useStore($linkedStudentsFioFilter);
  const initDataStatus = useStore(initialLinkedStudents.$status);
  const countStatus = useStore(availableToLinkStudentsCount.$status);
  const {
    students,
    pagination: { count },
  } = useStore(linkedStudents.$value);
  const hasStudents = count !== 0;
  const { lesson, stream } = useItemsInfo(data);
  useEffect(() => {
    if (isOpen) {
      availableToLinkStudentsCount.get(stream?.lessonImplId ?? '');
    } else {
      initialLinkedStudents.reset();
      linkedStudents.reset();
      availableToLinkStudentsCount.reset();
      setLinkedStudentsFioFilter('');
    }
  }, [isOpen]);
  useEffect(() => {
    if (isOpen) {
      initialLinkedStudents.get({ filter, streamId: stream?.lessonImplId ?? '' });
    }
  }, [isOpen, filter]);
  const bgClassName = useBackgroundClassName();
  const onClose = () => {
    setDrawerInfo({ type: 'VIEW_LINKED_STUDENTS', val: null });
  };

  if (!lesson || !stream) return null;

  return (
    <Drawer
      containerClassname="max-w-[1100px]"
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
      <Drawer.Header title="Обучающиеся потока" onClose={onClose} />
      <Drawer.Content>
        <div className="flex flex-col gap-y-4">
          <StreamDescBlock title={lesson.title} stream={stream.title} />
          <div className={`${bgClassName} flex justify-between items-center gap-6 py-2 sticky top-0 left-0 z-10`}>
            <div>
              {(hasStudents || filter) && (
                <FioFilter defaultValue={filter} changeHandler={setLinkedStudentsFioFilter} />
              )}
            </div>
            <LinkStudentsButton stream={stream} />
          </div>
          <LoadingWrapper
            loadingStatusList={[countStatus, initDataStatus]}
            errorStatusList={[countStatus, initDataStatus]}
          >
            {hasStudents ? (
              <LinkedStudentsList stream={stream} items={students} />
            ) : (
              <EmptyStub hasFilters={!!filter} />
            )}
          </LoadingWrapper>
        </div>
      </Drawer.Content>
    </Drawer>
  );
};
