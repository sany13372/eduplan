import { Drawer } from '@src/pages/Periods/components/Drawer';
import { useEffect } from 'react';
import { periodListInfo } from '@src/pages/Periods/model';
import { LoadingWrapper } from '@sber-universe/om-component-library';
import { useStore } from 'effector-react';
import { EmptyList, InfoPanel, PeriodList } from '@src/pages/Periods/components';

type PeriodListViewProps = {
  eduGridElId: string | null;
  onClose: () => void;
  title: string;
};
export const PeriodListView = ({ eduGridElId, onClose, title }: PeriodListViewProps) => {
  const isOpen = !!eduGridElId;
  const status = useStore(periodListInfo.$status);
  const periods = useStore(periodListInfo.$value);

  useEffect(() => {
    if (eduGridElId) periodListInfo.get(eduGridElId);
  }, [eduGridElId]);

  return (
    <Drawer title="Периоды части плана обучения" isOpen={isOpen} onClose={onClose}>
      <LoadingWrapper loadingStatusList={[status]} errorStatusList={[status]}>
        <div className="space-y-6">
          <InfoPanel title={title} allowAdd />
          {periods.length === 0 ? <EmptyList /> : <PeriodList periods={periods} />}
        </div>
      </LoadingWrapper>
    </Drawer>
  );
};
