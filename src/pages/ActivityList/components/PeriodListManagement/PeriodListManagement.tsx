import { $selectedEduGridElement, resetItemId } from '@src/pages/ActivityList/model';
import { Periods } from '@src/pages/Periods';
import { useStore } from 'effector-react';

export const PeriodListManagement = () => {
  const selectedItem = useStore($selectedEduGridElement);
  if (!selectedItem) return null;
  return <Periods eduGridElId={selectedItem.id} title={selectedItem.title} onClose={resetItemId} />;
};
