import React from 'react';
import { Formik } from 'formik';
import { SetEventInfo } from '@src/pages/Events/model/types';
import { useStore } from 'effector-react';
import { eventValidationSchema } from '@src/pages/Events/model/validation';
import { setEvent } from '@src/pages/Events/model';
import { SetEventInfoFormContent } from '@src/pages/Events/components/SetEventInfo/SetEventInfoFormContent';
import { FormPrompt } from '@sber-universe/om-component-library';

import { SetEventInfoFormProps } from './types';

export const SetEventInfoForm = ({ initData, isLoading, onReset, onSubmit }: SetEventInfoFormProps) => {
  const itemId = useStore(setEvent.$createdId);
  return (
    <div>
      <Formik<SetEventInfo>
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnMount={false}
        validateOnBlur={false}
        validationSchema={eventValidationSchema}
        initialValues={initData}
      >
        {() => {
          return (
            <>
              <FormPrompt isEnabled={!itemId} />
              <SetEventInfoFormContent isCreateItemForm={!initData.id} isLoading={isLoading} onReset={onReset} />
            </>
          );
        }}
      </Formik>
    </div>
  );
};
