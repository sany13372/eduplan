import React, { useMemo } from 'react';
import { Lesson, LinkStudentsData, Stream } from '@src/pages/LessonSettings/model/types';
import {
  $unlinkedStudentsFioFilter,
  confirmLinkStudentDrawerClose,
  initialUnlinkedStudents,
  linkStudents,
  setUnlinkedStudentsFioFilter,
  unlinkedStudents,
} from '@src/pages/LessonSettings/model';
import { Form, Formik, useFormikContext } from 'formik';
import { ButtonsBlock } from '@src/pages/LessonSettings/components/EditStreamDrawers/FormContent';
import { EmptyFioFilterResult, FioFilter, StreamDescBlock } from '@src/pages/LessonSettings/components';
import { useStore } from 'effector-react';
import { CloseDrawerConfirmDialog, ConfirmWatcher } from '@src/components';
import classnames from 'classnames';
import { LinkAllCheckbox } from '@src/pages/LessonSettings/components/LinkStudentsDrawer/LinkAllCheckbox';
import { LoadingWrapper } from '@sber-universe/om-component-library';
import { useBackgroundClassName } from '@utils/hooks';

import { StudentsList } from './StudentsList';

type LinkStudentsFormProps = {
  lesson: Lesson;
  stream: Stream;
  portalId: string;
  onClose: () => void;
};

const LinkStudentsFormBody = ({ stream, portalId, lesson, onClose }: LinkStudentsFormProps) => {
  const status = useStore(linkStudents.$status);
  const initDataStatus = useStore(initialUnlinkedStudents.$status);
  const bgColor = useBackgroundClassName();
  const { students } = useStore(unlinkedStudents.$value);
  const filter = useStore($unlinkedStudentsFioFilter);
  const { values } = useFormikContext<LinkStudentsData>();
  const submitIsDisabled = useMemo(
    () => (students.length ? !values.linkAll : true) && !values?.students.length,
    [values, students],
  );
  return (
    <Form className="flex flex-col gap-y-4">
      <ConfirmWatcher nodes={confirmLinkStudentDrawerClose} />
      <StreamDescBlock title={lesson.title} stream={stream.title} />
      <ButtonsBlock portalId={portalId} status={status} onClose={onClose} submitIsDisabled={submitIsDisabled} />
      <CloseDrawerConfirmDialog nodes={confirmLinkStudentDrawerClose} />
      <div className={classnames(bgColor, ' sticky top-0 left-0 flex items-center justify-between py-2 gap-6 z-10')}>
        <LinkAllCheckbox />
        <FioFilter defaultValue={filter} changeHandler={setUnlinkedStudentsFioFilter} />
      </div>
      <LoadingWrapper loadingStatusList={[initDataStatus]} errorStatusList={[initDataStatus]}>
        {students.length > 0 ? (
          <StudentsList students={students} streamId={stream.lessonImplId} />
        ) : (
          <EmptyFioFilterResult />
        )}
      </LoadingWrapper>
    </Form>
  );
};

export const LinkStudentsForm = ({ stream, portalId, lesson, onClose }: LinkStudentsFormProps) => {
  const initData: LinkStudentsData = useMemo(
    () => ({
      linkAll: false,
      stream,
      students: [],
    }),
    [stream],
  );
  return (
    <Formik<LinkStudentsData> initialValues={initData} onSubmit={linkStudents.add}>
      <LinkStudentsFormBody portalId={portalId} lesson={lesson} onClose={onClose} stream={stream} />
    </Formik>
  );
};
