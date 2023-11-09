import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { ErrorMessage } from '@src/components';
import { Formik } from 'formik';
import { FormPrompt, ErrorDialog, LoadingWrapper } from '@sber-universe/om-component-library';
import { ValidationErrors } from '@utils/validation';
import { Store } from 'effector';
import { Typography } from '@kit-edu/typography';
import { IotTemplate } from '@src/pages/IotTemplateManagement/model/types';
import { EffectState } from 'patronum/status';
import { iotTemplateSchema } from '@src/pages/IotTemplateManagement/model/validation';

import { IotTemplateFormContent } from './IotTemplateFormContent';

export type IotTemplateFormProps<T extends IotTemplate> = {
  onSuccess: (itemId: string) => void;
  initData: T;
  onSubmit: (values: T) => void;
  onReset: () => void;
  errorStore: Store<ValidationErrors>;
  statusStore: Store<EffectState>;
  resetErrorStore: () => void;
  savedItemIdStore: Store<string>;
  title: string;
};

export const IotTemplateForm = <T extends IotTemplate>({
  savedItemIdStore,
  errorStore,
  statusStore,
  resetErrorStore,
  onSuccess,
  initData,
  onSubmit,
  onReset,
  title,
}: IotTemplateFormProps<T>) => {
  const savedItemId = useStore(savedItemIdStore);
  const errors = useStore(errorStore);
  const status = useStore(statusStore);

  useEffect(() => {
    if (savedItemId) onSuccess(savedItemId);
  }, [savedItemId, onSuccess]);
  return (
    <div className="flex flex-col space-y-8">
      <Typography as="h2" size="32px" fontWeight="semibold">
        {title}
      </Typography>
      <LoadingWrapper loadingStatusList={[]} errorStatusList={[]}>
        <div>
          {!initData && <ErrorMessage />}
          {initData && (
            <Formik<T>
              initialValues={initData}
              validateOnBlur={false}
              validateOnChange={false}
              validateOnMount={false}
              initialErrors={{}}
              validationSchema={iotTemplateSchema}
              onSubmit={onSubmit}
            >
              {() => (
                <>
                  <FormPrompt isEnabled={!savedItemId} />
                  <ErrorDialog
                    portalId="iot_template_error_dialog_portal"
                    isOpen={Boolean(errors[''])}
                    dialogContent={{ description: errors[''] }}
                    onClose={resetErrorStore}
                  />
                  <IotTemplateFormContent onReset={onReset} isSubmitting={status === 'pending'} />
                </>
              )}
            </Formik>
          )}
        </div>
      </LoadingWrapper>
    </div>
  );
};
