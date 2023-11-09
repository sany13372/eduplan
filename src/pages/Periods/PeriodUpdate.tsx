import { updatePeriod } from '@src/pages/Periods/model';
import { PeriodForm } from '@src/pages/Periods/components/PeriodForm';
import { Period } from '@src/pages/Periods/model/types';
import { useMemo } from 'react';

type PeriodListViewProps = {
  eduGridElId: string;
  title: string;
  init: Period;
};
export const PeriodUpdate = ({ title, init, eduGridElId }: PeriodListViewProps) => {
  const initData = useMemo(
    () => ({
      ...init,
      eduGridElementId: eduGridElId,
    }),
    [eduGridElId, init],
  );

  return (
    <PeriodForm<Period>
      drawerTitle="Редактирование периода"
      state={updatePeriod}
      onSubmit={updatePeriod.update}
      savedItemIdStore={updatePeriod.$updatedId}
      eduGridElement={{ id: eduGridElId, caption: title }}
      initData={initData}
    />
  );
};
