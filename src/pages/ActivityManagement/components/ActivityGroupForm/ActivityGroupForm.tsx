import { ShortActivityGroupInfo } from '@src/pages/ActivityManagement/model/types';
import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { ErrorMessage } from '@src/components';
import { Formik } from 'formik';
import { activityGroupSchema } from '@src/pages/ActivityManagement/model/validation';
import { FormPrompt, ErrorDialog, LoadingWrapper } from '@sber-universe/om-component-library';
import { ValidationErrors } from '@utils/validation';
import { Store } from 'effector';
import { Typography } from '@kit-edu/typography';

export type ActivityGroupFormProps = {
  onSuccess: (itemId: string) => void;
  initData: ShortActivityGroupInfo;
  onSubmit: (values: ShortActivityGroupInfo) => void;
  errorStore: Store<ValidationErrors>;
  resetErrorStore: () => void;
  savedItemIdStore: Store<string>;
  title: string;
};

export const ActivityGroupForm: React.FC<ActivityGroupFormProps> = ({
  savedItemIdStore,
  errorStore,
  resetErrorStore,
  onSuccess,
  initData,
  onSubmit,
  children,
  title,
}) => {
  const savedItemId = useStore(savedItemIdStore);
  const errors = useStore(errorStore);

  useEffect(() => {
    if (savedItemId) onSuccess(savedItemId);
  }, [savedItemId, onSuccess]);
  return (
    <div className="flex  flex-col space-y-8">
      <Typography as="h2" size="32px" fontWeight="semibold">
        {title}
      </Typography>
      <LoadingWrapper loadingStatusList={[]} errorStatusList={[]}>
        <div>
          {!initData && <ErrorMessage />}
          {initData && (
            <Formik<ShortActivityGroupInfo>
              initialValues={initData}
              validateOnBlur={false}
              validateOnChange={false}
              validateOnMount={false}
              initialErrors={{}}
              validationSchema={activityGroupSchema}
              onSubmit={onSubmit}
            >
              {() => (
                <>
                  <FormPrompt isEnabled={!savedItemId} />
                  <ErrorDialog
                    portalId="save_eduplan_error_dialog_portal"
                    isOpen={Boolean(errors[''])}
                    dialogContent={{ description: errors[''] }}
                    onClose={resetErrorStore}
                  />

                  {children}
                </>
              )}
            </Formik>
          )}
        </div>
      </LoadingWrapper>
    </div>
  );
};
