import React, { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { ErrorMessage } from '@src/components';
import { Formik } from 'formik';
import { ErrorDialog } from '@sber-universe/om-component-library';
import { Store } from 'effector';
import { NewPeriod } from '@src/pages/Periods/model/types';
import { periodSchema } from '@src/pages/Periods/model/validation';
import { ConfirmAction, Drawer, InfoPanel } from '@src/pages/Periods/components';
import { FormContent } from '@src/pages/Periods/components/PeriodForm/PeriodFormContent';
import { AddActionEffectorNode, UpdateActionEffectorNode } from '@utils/effector';
import { addSuccessToast } from '@src/app/model';
import { periodListInfo, resetSetPeriodInfo } from '@src/pages/Periods/model';
import partial from 'lodash/partial';
import { Reference } from '@src/types';

export type PeriodFormProps<T extends NewPeriod> = {
  initData: T;
  onSubmit: (values: T) => void;
  state: AddActionEffectorNode<T> | UpdateActionEffectorNode<T>;
  savedItemIdStore: Store<string>;
  eduGridElement: Reference;
  drawerTitle: string;
};

export const PeriodForm = <T extends NewPeriod>({
  state,
  initData,
  onSubmit,
  eduGridElement,
  savedItemIdStore,
  drawerTitle,
}: PeriodFormProps<T>) => {
  const savedItemId = useStore(savedItemIdStore);
  const errors = useStore(state.$validationErrors);
  const { id: eduGridElementId, caption: eduGridElementTitle } = eduGridElement;
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const toggleShowResetConfirm = () => {
    setShowResetConfirm((val) => !val);
  };
  const onSidepageClose = (isSuccess: boolean, gridElId: string) => {
    if (isSuccess) {
      addSuccessToast({});
      periodListInfo.get(gridElId);
    }
    resetSetPeriodInfo();
  };

  const onSidePageCloseSuccess = partial(onSidepageClose, true, eduGridElementId);
  const onSidePageCloseReset = partial(onSidepageClose, false, eduGridElementId);
  useEffect(() => {
    if (savedItemId) onSidePageCloseSuccess();
  }, [savedItemId, onSidePageCloseSuccess]);

  return (
    <Drawer title={drawerTitle} isOpen onClose={toggleShowResetConfirm} isNested>
      <div className="space-y-6">
        <InfoPanel title={eduGridElementTitle} allowAdd={false} />
        <div className="flex flex-col space-y-8">
          <div>
            {!initData && <ErrorMessage />}
            {initData && (
              <Formik<T>
                initialValues={initData}
                validateOnBlur={false}
                validateOnChange={false}
                validateOnMount={false}
                validationSchema={periodSchema}
                onSubmit={onSubmit}
              >
                <>
                  <ErrorDialog
                    portalId="period_error_dialog_portal"
                    isOpen={Boolean(errors[''])}
                    dialogContent={{
                      description: errors[''],
                    }}
                    onClose={state.resetErrors}
                  />
                  <FormContent serverErrors={errors} onReset={toggleShowResetConfirm} isSubmitted={false} />
                </>
              </Formik>
            )}
          </div>
        </div>
      </div>
      <ConfirmAction onConfirm={onSidePageCloseReset} onReset={toggleShowResetConfirm} isAvailable={showResetConfirm} />
    </Drawer>
  );
};
