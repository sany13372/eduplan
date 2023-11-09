import { Drawer } from '@sber-universe/om-component-library';
import {
  $createStreamStatus,
  confirmCreateStreamDrawerClose,
  createStream,
  setDrawerInfo,
} from '@src/pages/LessonSettings/model';
import { LessonDescBlock } from '@src/pages/LessonSettings/components';
import React, { useMemo } from 'react';
import { useStore } from 'effector-react';
import { DrawerData, Stream } from '@src/pages/LessonSettings/model/types';
import { Form, Formik } from 'formik';
import { streamValidationSchema } from '@src/pages/LessonSettings/model/validation';
import { useItemsInfo } from '@src/pages/LessonSettings/model/hooks';
import { ConfirmWatcher, CloseDrawerConfirmDialog } from '@src/components';
import { useConfirmCallbackWrapped } from '@utils/hooks';

import { TitleFormBlock, PassDateBlock, IsAllowBlock, ButtonsBlock } from './FormContent';

export type CreateStreamDrawerProps = {
  isOpen: boolean;
  data: DrawerData | null;
};
export const CreateStreamDrawer = ({ isOpen, data }: CreateStreamDrawerProps) => {
  const portalId = 'createStreamPortal';
  const status = useStore($createStreamStatus);
  const { lesson, theme } = useItemsInfo(data);
  const initData: Stream = useMemo(
    () => ({
      id: '',
      title: '',
      themeId: theme?.id ?? '',
      lessonId: data?.lessonId ?? '',
      isAllowAlways: false,
      isPublic: false,
      endDate: null,
      passDate: null,
      lessonImplId: '',
      startDate: null,
      studentCount: 0,
      teacherList: [],
    }),
    [data?.lessonId, theme?.id],
  );
  const onClose = () => {
    setDrawerInfo({ type: 'CREATE_STREAM', val: null });
  };
  const onCloseWrapper = useConfirmCallbackWrapped({ callback: onClose, nodes: confirmCreateStreamDrawerClose });
  if (!lesson) return null;

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
        isTransparent: false,
      }}
    >
      <Drawer.Header title="Добавление потока" onClose={onCloseWrapper} />
      <Drawer.Content>
        <Formik<Stream>
          initialValues={initData}
          validationSchema={streamValidationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          validateOnMount={false}
          isInitialValid
          onSubmit={createStream}
        >
          <Form className="flex flex-col gap-y-4">
            <ConfirmWatcher nodes={confirmCreateStreamDrawerClose} />
            <LessonDescBlock title={lesson.title} lessonKindCaption={lesson.lessonKind.caption} />
            <TitleFormBlock />
            <IsAllowBlock />
            <PassDateBlock />
            <ButtonsBlock portalId={portalId} status={status} onClose={onCloseWrapper} />
            <CloseDrawerConfirmDialog nodes={confirmCreateStreamDrawerClose} />
          </Form>
        </Formik>
      </Drawer.Content>
    </Drawer>
  );
};
