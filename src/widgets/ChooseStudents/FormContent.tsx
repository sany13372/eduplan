import { Form, useFormikContext } from 'formik';
import { NoStudentsStub, StudentCard, UploadStudentsOnScroll } from '@src/widgets/ChooseStudents/components';
import { ScrollArrow } from '@src/pages/LessonSettings/components';
import { CloseDrawerConfirmDialog, ConfirmWatcher, DrawerFormButtons } from '@src/components';
import { chooseStudentsInfo, closeConfirm, linkStudents } from '@src/widgets/ChooseStudents/model';
import { Drawer } from '@sber-universe/om-component-library';
import React from 'react';
import { useStore } from 'effector-react';

type FormContentProps = {
  portalId: string;
  onClose: () => void;
};
export const FormContent = ({ onClose, portalId }: FormContentProps) => {
  const { data: studentList } = useStore(chooseStudentsInfo.$value);
  const status = useStore(linkStudents.$status);

  const { submitForm, dirty } = useFormikContext();
  return (
    <Form className="flex flex-col">
      {studentList.length === 0 ? (
        <NoStudentsStub />
      ) : (
        <div className="relative">
          <ScrollArrow className="right-0 bottom-6">
            <div role="group" key="group_container" aria-labelledby="checkbox-group">
              {studentList.map((e) => (
                <StudentCard key={e.id} student={e} />
              ))}
            </div>

            <UploadStudentsOnScroll key="upload_on_scroll" />
          </ScrollArrow>

          <ConfirmWatcher nodes={closeConfirm} />
          <CloseDrawerConfirmDialog nodes={closeConfirm} />
        </div>
      )}

      <Drawer.Footer portalId={portalId}>
        <DrawerFormButtons onResetClick={onClose} status={status} submitDisabled={!dirty} onSubmit={submitForm} />
      </Drawer.Footer>
    </Form>
  );
};
