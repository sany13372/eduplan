import { useMemo } from 'react';
import { createPeriod } from '@src/pages/Periods/model';
import { PeriodForm } from '@src/pages/Periods/components/PeriodForm';
import { NewPeriod } from '@src/pages/Periods/model/types';

type PeriodListViewProps = {
  eduGridElId: string;
  title: string;
};
export const PeriodCreate = ({ eduGridElId, title }: PeriodListViewProps) => {
  const initData = useMemo(
    () => ({
      eduGridElementId: eduGridElId,
      title: '',
      dates: {},
    }),
    [eduGridElId],
  );

  return (
    <PeriodForm<NewPeriod>
      drawerTitle="Добавление периода"
      state={createPeriod}
      onSubmit={createPeriod.add}
      savedItemIdStore={createPeriod.$createdId}
      eduGridElement={{ id: eduGridElId, caption: title }}
      initData={initData}
    />
  );
};
