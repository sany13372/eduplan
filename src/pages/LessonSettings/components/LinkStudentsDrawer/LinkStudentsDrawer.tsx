import { useStore } from 'effector-react';
import {
  $unlinkedStudentsFioFilter,
  confirmLinkStudentDrawerClose,
  initialUnlinkedStudents,
  setDrawerInfo,
  setUnlinkedStudentsFioFilter,
  unlinkedStudents,
} from '@src/pages/LessonSettings/model';
import { useItemsInfo } from '@src/pages/LessonSettings/model/hooks';
import { DrawerData } from '@src/pages/LessonSettings/model/types';
import React, { useEffect } from 'react';
import { Drawer } from '@sber-universe/om-component-library';
import { useConfirmCallbackWrapped } from '@utils/hooks';

import { LinkStudentsForm } from './LinkStudentsForm';

export type LinkStudentsDrawerProps = {
  isOpen: boolean;
  data: DrawerData | null;
};
export const LinkStudentsDrawer = ({ isOpen, data }: LinkStudentsDrawerProps) => {
  const portalId = 'linkStudentsPortal';
  const filter = useStore($unlinkedStudentsFioFilter);
  const { lesson, stream } = useItemsInfo(data);

  useEffect(() => {
    if (isOpen) initialUnlinkedStudents.get({ streamId: stream?.lessonImplId ?? '', filter });
    else {
      unlinkedStudents.reset();
      initialUnlinkedStudents.reset();
      setUnlinkedStudentsFioFilter('');
    }
  }, [filter, isOpen, stream?.lessonImplId]);

  const onClose = () => {
    setDrawerInfo({ type: 'LINK_STUDENTS', val: null });
  };

  const onCloseWrapper = useConfirmCallbackWrapped({ callback: onClose, nodes: confirmLinkStudentDrawerClose });
  if (!lesson || !stream) return null;

  return (
    <Drawer
      containerClassname="max-w-[1100px]"
      onClose={onCloseWrapper}
      isOpen={isOpen}
      portalId={portalId}
      lockScroll
      backDropProps={{
        isClickable: true,
        isDisabled: false,
        isTransparent: true,
      }}
    >
      <Drawer.Header title="Добавление обучающихся" onClose={onCloseWrapper} />
      <Drawer.Content>
        <LinkStudentsForm stream={stream} lesson={lesson} portalId={portalId} onClose={onCloseWrapper} />
      </Drawer.Content>
    </Drawer>
  );
};
