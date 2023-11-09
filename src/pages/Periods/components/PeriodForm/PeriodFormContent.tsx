import { Form, useFormikContext } from 'formik';
import { ComboBox, Input, DateInput, LoadingWrapper } from '@sber-universe/om-component-library';
import React, { useEffect } from 'react';
import { NewPeriod } from '@src/pages/Periods/model/types';
import { FormButtonGroup } from '@src/components';
import { useStore } from 'effector-react';
import { periodKindsStore, setConfirmEnable } from '@src/pages/Periods/model';
import { ValidationErrors } from '@utils/validation';

import { Label } from './Label';

export type PeriodFormContentProps = {
  onReset: () => void;
  isSubmitted: boolean;
  serverErrors: ValidationErrors;
};
export const FormContent = <T extends NewPeriod>({
  onReset,
  isSubmitted,
  serverErrors,
}: PeriodFormContentProps): JSX.Element => {
  const { dirty, setStatus } = useFormikContext();

  useEffect(() => {
    setConfirmEnable(dirty);
  }, [dirty]);

  useEffect(() => {
    setStatus(serverErrors);
  }, [serverErrors, setStatus]);

  const periodKindsStatus = useStore(periodKindsStore.$status);
  const periodKinds = useStore(periodKindsStore.$items);
  useEffect(() => {
    periodKindsStore.get();
  }, []);

  return (
    <LoadingWrapper loadingStatusList={[periodKindsStatus]} errorStatusList={[periodKindsStatus]}>
      <Form className="space-y-6">
        <Label title="Вид">
          <ComboBox<T>
            name="periodKind"
            placeholder="Выберите вид периода"
            items={periodKinds}
            fullWidth
            matchWidth
            // @ts-ignore
            appearance="white"
          />
        </Label>
        <Label title="Название">
          <Input<T> name="title" placeholder="Напишите название периода" appearance="white" colorMode="onDark" />
        </Label>

        <div className="grid grid-cols-2 gap-6 ">
          <Label title="Дата начала">
            <DateInput
              name="dates.start"
              // @ts-ignore
              fullWidth
              appearance="white"
            />
          </Label>
          <Label title="Дата окончания">
            <DateInput
              name="dates.end"
              // @ts-ignore
              fullWidth
              appearance="white"
            />
          </Label>
        </div>

        <FormButtonGroup submitIsDisabled={!dirty} onReset={onReset} withoutSidebar isLoading={isSubmitted} />
      </Form>
    </LoadingWrapper>
  );
};
