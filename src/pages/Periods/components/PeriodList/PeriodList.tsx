import { Period } from '@src/pages/Periods/model/types';
import { PeriodCard } from '@src/pages/Periods/components';

type PeriodListProps = {
  periods: Period[];
};

export const PeriodList = ({ periods }: PeriodListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {periods.map((e) => (
        <PeriodCard key={e.id} item={e} />
      ))}
    </div>
  );
};
