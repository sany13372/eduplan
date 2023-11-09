/* eslint-disable react-hooks/exhaustive-deps */
import { Form, useFormikContext } from 'formik';
import { AddTeacherCard } from '@src/pages/Teachers/components';
import { FormButtonGroup, ScrollArrow } from '@src/components';
import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { inviteTeacherList, updateTeacherList } from '@src/pages/Teachers/model';

type FormContentProps = {
  resetClickHandler: () => void;
  onFormUpdate: (val: boolean) => void;
};
export const FormContent = ({ onFormUpdate, resetClickHandler }: FormContentProps) => {
  const getInviteTeacherListValue = useStore(inviteTeacherList.$value);
  const updateTeacherListStatus = useStore(updateTeacherList.$status);
  const { dirty } = useFormikContext();

  useEffect(() => {
    onFormUpdate(dirty);
  }, [dirty]);

  return (
    <Form>
      <ScrollArrow
        isDisabled={getInviteTeacherListValue.length === 0}
        className="bottom-[112px] bg-white"
        withoutOffset
      >
        <div className="space-y-2">
          {getInviteTeacherListValue.map((e) => (
            <AddTeacherCard data={e} key={e.id} />
          ))}
        </div>

        <FormButtonGroup
          onReset={resetClickHandler}
          contentWrapperClassName="px-4"
          withoutSidebar
          isLoading={updateTeacherListStatus === 'pending'}
        />
      </ScrollArrow>
    </Form>
  );
};
