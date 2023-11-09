import { Drawer } from '@sber-universe/om-component-library';
import { $updateStreamStatus, setDrawerInfo, updateStream } from '@src/pages/LessonSettings/model';
import { LessonDescBlock } from '@src/pages/LessonSettings/components';
import React from 'react';
import { useStore } from 'effector-react';
import { DrawerData, DrawerType, Stream } from '@src/pages/LessonSettings/model/types';
import { Form, Formik } from 'formik';
import { streamDatesValidationSchema, streamTitleValidationSchema } from '@src/pages/LessonSettings/model/validation';
import { useItemsInfo } from '@src/pages/LessonSettings/model/hooks';
import { ConfirmEffectorNodes } from '@utils/effector';
import { useConfirmCallbackWrapped } from '@utils/hooks';
import { ConfirmWatcher, CloseDrawerConfirmDialog } from '@src/components';

import { TitleFormBlock, PassDateBlock, IsAllowBlock, ButtonsBlock } from './FormContent';

export type UpdateStreamDrawerProps = {
  isOpen: boolean;
  data: DrawerData | null;
  type: Extract<DrawerType, 'UPDATE_STREAM_TITLE' | 'UPDATE_STREAM_DATES'>;
  title: string;
  successToastMessage: string;
  confirmNodes: ConfirmEffectorNodes;
};
export const UpdateStreamDrawer = ({
  isOpen,
  data,
  type,
  title,
  successToastMessage,
  confirmNodes,
}: UpdateStreamDrawerProps) => {
  const portalId = 'updateStreamPortal';
  const { lesson, stream } = useItemsInfo(data);
  const status = useStore($updateStreamStatus);
  const onClose = () => {
    setDrawerInfo({ type, val: null });
  };
  const onCloseWrapper = useConfirmCallbackWrapped({ callback: onClose, nodes: confirmNodes });

  const onSubmit = (values: Stream) => {
    updateStream({ val: values, successMessage: successToastMessage });
  };

  if (!lesson || !stream) return null;

  return (
    <Drawer
      containerClassname="max-w-[900px]"
      onClose={onCloseWrapper}
      isOpen={isOpen}
      lockScroll={false}
      backDropProps={{
        isTransparent: true,
        isDisabled: false,
        isClickable: true,
      }}
      portalId={portalId}
    >
      <Drawer.Header title={title} onClose={onCloseWrapper} />
      <Drawer.Content containerClassname="flex flex-col gap-y-4">
        <Formik<Stream>
          initialValues={stream}
          validationSchema={type === 'UPDATE_STREAM_TITLE' ? streamTitleValidationSchema : streamDatesValidationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          validateOnMount={false}
          isInitialValid
          onSubmit={onSubmit}
        >
          <Form className="flex flex-col gap-y-4">
            <ConfirmWatcher nodes={confirmNodes} />
            <LessonDescBlock title={lesson.title} lessonKindCaption={lesson.lessonKind.caption} />
            {type === 'UPDATE_STREAM_TITLE' && <TitleFormBlock />}
            {type === 'UPDATE_STREAM_DATES' && (
              <>
                <IsAllowBlock />
                <PassDateBlock />
              </>
            )}
            <ButtonsBlock portalId={portalId} status={status} onClose={onCloseWrapper} />
            <CloseDrawerConfirmDialog nodes={confirmNodes} />
          </Form>
        </Formik>
      </Drawer.Content>
    </Drawer>
  );
};
