import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { Drawer, LoadingWrapper } from '@sber-universe/om-component-library';
import { confirmLinkTeacherDrawerClose, setDrawerInfo, unlinkedTeachers } from '@src/pages/LessonSettings/model';
import { useItemsInfo } from '@src/pages/LessonSettings/model/hooks';
import { DrawerData } from '@src/pages/LessonSettings/model/types';
import { useConfirmCallbackWrapped } from '@utils/hooks';

import { LinkTeachersForm } from './LinkTeachersForm';

export type LinkTeachersDrawerProps = {
  isOpen: boolean;
  data: DrawerData | null;
};
export const LinkTeachersDrawer = ({ isOpen, data }: LinkTeachersDrawerProps) => {
  const portalId = 'linkTeachersPortal';

  const { lesson, stream } = useItemsInfo(data);
  const initDataStatus = useStore(unlinkedTeachers.$status);

  useEffect(() => {
    if (isOpen) unlinkedTeachers.get(stream?.lessonImplId ?? '');
    else unlinkedTeachers.reset();
  }, [isOpen, stream?.lessonImplId]);

  const onClose = () => {
    setDrawerInfo({ type: 'LINK_TEACHERS', val: null });
  };

  const onCloseWrapper = useConfirmCallbackWrapped({ callback: onClose, nodes: confirmLinkTeacherDrawerClose });

  if (!lesson || !stream) return null;

  return (
    <Drawer
      containerClassname="max-w-[900px]"
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
      <Drawer.Header title="Добавление проверяющих" onClose={onCloseWrapper} />
      <Drawer.Content>
        <LoadingWrapper loadingStatusList={[initDataStatus]} errorStatusList={[initDataStatus]}>
          <LinkTeachersForm stream={stream} lesson={lesson} portalId={portalId} onClose={onCloseWrapper} />
        </LoadingWrapper>
      </Drawer.Content>
    </Drawer>
  );
};
