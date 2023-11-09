import React, { useEffect } from 'react';
import { PeriodListView } from '@src/pages/Periods/PeriodListView';
import './model/init';
import { DeletePeriodConfirmDialog } from '@src/pages/Periods/components';
import { $actionStore, resetDomain } from '@src/pages/Periods/model';
import { useStore } from 'effector-react';
import { PeriodCreate } from '@src/pages/Periods/PeriodCreate';
import { PeriodUpdate } from '@src/pages/Periods/PeriodUpdate';

type PeriodsProps = {
  eduGridElId: string;
  title: string;
  onClose: () => void;
};
export const Periods = ({ eduGridElId, title, onClose }: PeriodsProps) => {
  useEffect(() => resetDomain, []);
  const actions = useStore($actionStore);
  return (
    <>
      <PeriodListView onClose={onClose} eduGridElId={eduGridElId} title={title} />
      {actions?.action === 'ADD' && eduGridElId && <PeriodCreate eduGridElId={eduGridElId} title={title} />}
      {actions?.action === 'UPDATE' && <PeriodUpdate init={actions.item} eduGridElId={eduGridElId} title={title} />}
      <DeletePeriodConfirmDialog />
    </>
  );
};
