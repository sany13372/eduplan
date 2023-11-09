import { Form, useFormikContext } from 'formik';
import { ScrollArrow } from '@src/pages/LessonSettings/components';
import { CloseDrawerConfirmDialog, ConfirmWatcher, DrawerFormButtons } from '@src/components';
import { Drawer } from '@sber-universe/om-component-library';
import React from 'react';
import { useStore } from 'effector-react';
import { availableToLinkAdmins, linkAdminsCloseConfirm } from '@src/pages/EduPlans/model';

import { LinkTeacherRow } from './LinkTeacherRow';
import { UploadTeachersOnScroll } from './UploadOnScroll';

type FormContentProps = {
  portalId: string;
  onClose: () => void;
};
export const FormContent = ({ onClose, portalId }: FormContentProps) => {
  const { teachers: teachersList } = useStore(availableToLinkAdmins.$value);
  const status = useStore(availableToLinkAdmins.$status);
  const { submitForm, dirty } = useFormikContext();
  return (
    <Form className="flex flex-col">
      <div className="relative">
        <ScrollArrow className="right-0 bottom-6">
          <div role="group" key="group_container" aria-labelledby="checkbox-group" className="flex flex-col gap-2">
            {teachersList.map((e) => (
              <LinkTeacherRow key={e.id} data={e} />
            ))}
          </div>
          <UploadTeachersOnScroll key="upload_on_scroll" />
        </ScrollArrow>

        <ConfirmWatcher nodes={linkAdminsCloseConfirm} />
        <CloseDrawerConfirmDialog nodes={linkAdminsCloseConfirm} />
      </div>

      <Drawer.Footer portalId={portalId}>
        <DrawerFormButtons onResetClick={onClose} status={status} submitDisabled={!dirty} onSubmit={submitForm} />
      </Drawer.Footer>
    </Form>
  );
};
