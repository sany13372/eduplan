/* eslint-disable react/jsx-props-no-spreading */
import { FormButtonGroup, FormButtonGroupProps } from '@sber-universe/om-component-library';
import React from 'react';
import { EffectState } from 'patronum/status';

type DrawerFormButtonsProps = Omit<FormButtonGroupProps, 'isSubmitting'> & {
  status: EffectState;
};
export const DrawerFormButtons = ({ status, ...props }: DrawerFormButtonsProps) => {
  const isPending = status === 'pending';
  return (
    <div className="bg-white px-9 py-5 flex justify-end gap-4">
      <FormButtonGroup {...props} isSubmitting={isPending} />
    </div>
  );
};
