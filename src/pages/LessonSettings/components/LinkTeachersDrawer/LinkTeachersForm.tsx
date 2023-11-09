import React, { useMemo } from 'react';
import { Lesson, LinkTeachersData, Stream } from '@src/pages/LessonSettings/model/types';
import { confirmLinkTeacherDrawerClose, linkedTeachers, linkTeachers } from '@src/pages/LessonSettings/model';
import { Form, Formik } from 'formik';
import { ButtonsBlock } from '@src/pages/LessonSettings/components/EditStreamDrawers/FormContent';
import { ScrollArrow, StreamDescBlock } from '@src/pages/LessonSettings/components';
import { useStore } from 'effector-react';
import { CloseDrawerConfirmDialog, ConfirmWatcher } from '@src/components';

import { TeachersList } from './TeachersList';

type LinkTeachersFormProps = {
  lesson: Lesson;
  stream: Stream;
  portalId: string;
  onClose: () => void;
};
export const LinkTeachersForm = ({ stream, portalId, lesson, onClose }: LinkTeachersFormProps) => {
  const status = useStore(linkTeachers.$status);
  const linked = useStore(linkedTeachers.$value);
  const initData: LinkTeachersData = useMemo(
    () => ({
      stream,
      teachers: linked,
    }),
    [linked, stream],
  );
  return (
    <Formik<LinkTeachersData> initialValues={initData} onSubmit={linkTeachers.add}>
      <Form className="flex flex-col gap-y-4">
        <ConfirmWatcher nodes={confirmLinkTeacherDrawerClose} />
        <StreamDescBlock title={lesson.title} stream={stream.title} />
        <ButtonsBlock portalId={portalId} status={status} onClose={onClose} />
        <CloseDrawerConfirmDialog nodes={confirmLinkTeacherDrawerClose} />
        <ScrollArrow isDisabled={false} className="right-0 bottom-6">
          <TeachersList />
        </ScrollArrow>
      </Form>
    </Formik>
  );
};
